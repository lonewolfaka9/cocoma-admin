import { OnlineRegisterUserType, onlineUserSchema } from '@/lib/user-schema';

import { NextResponse } from 'next/server';
import { generatevalidationCode } from '@/app/helpers';
import { prisma } from '@/lib/prisma';
import { sendConfirmEmailAddressMail } from '@/app/email';
import { v4 as uuid } from 'uuid';

export async function GET(
  request: Request,
  { params }: { params: { sessionToken: string } }
) {
  const user_id = uuid();
  const sessionToken = params.sessionToken;
  const responseResult = {
    session_token: sessionToken,
    user_id: user_id
  };

  return NextResponse.json(responseResult);
}

const getSessionByToken = async (sessionToken: string) => {
  const existingSession = await prisma.onlineUserSession.findFirst({
    where: {
      sessionId: sessionToken
    }
  });

  return {
    sessionId: existingSession?.sessionId,
    onlineUserId: existingSession?.onlineUserId
  };
};

const updateSession = async (
  sessionToken: string,
  onlineUserId: number,
  validationCode: string
) => {
  const session = await prisma.onlineUserSession.upsert({
    where: {
      sessionId: sessionToken
    },
    update: {
      onlineUserId,
      validationCode: validationCode
    },
    create: {
      onlineUserId,
      sessionId: sessionToken,
      validationCode: validationCode
    }
  });

  return session;
};

const isSessionValidationCodeExists = async (
  sessionToken: string,
  validationCode: string
) => {
  console.log(
    'isSessionValidationCodeExists',
    validationCode,
    ' => ',
    sessionToken
  );

  const session = await prisma.onlineUserSession.findFirst({
    where: {
      sessionId: sessionToken,
      validationCode: validationCode
    }
  });

  return session ? true : false;
};

const upsertOnlineUser = async (
  sessionToken: string,
  userData: OnlineRegisterUserType,
  emailVerified: boolean
) => {
  const { onlineUserId } = await getSessionByToken(sessionToken);
  const user = await prisma.onlineUser.upsert({
    where: {
      id: onlineUserId || -1
    },
    update: {
      ...userData,
      emailVerified
    },
    create: {
      ...userData,
      emailVerified
    }
  });

  return user;
};

export async function POST(
  request: Request,
  { params }: { params: { sessionToken: string } }
) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    console.log('Received onboarding data:', body);

    const sessionToken = params.sessionToken;
    const {
      success: isValidUserInput,
      data: userData,
      error
    } = onlineUserSchema.safeParse(body);
    if (!isValidUserInput) {
      return NextResponse.json(
        {
          error: 'Invalid onboarding data',
          messages: error?.issues.map((issue) => issue.message)
        },
        { status: 400 }
      );
    }

    // if no validation code, generate one and send email
    if (!userData.validationCode) {
      const validationCode = generatevalidationCode();
      const { id: onlineUserId } = await upsertOnlineUser(
        sessionToken,
        userData,
        false
      );

      updateSession(sessionToken, onlineUserId, validationCode);
      console.log('sending validationCode', validationCode);

      const isEmailSend = await sendConfirmEmailAddressMail({
        emailAddressToConfirm: userData.email,
        validationCode,
        sessionToken
      });
      const emailMessage = isEmailSend
        ? `Validation code send to your email : ${userData.email} `
        : `Failed to send email to your email ${userData.email}`;
      return NextResponse.json(
        {
          message: emailMessage,
          data: {
            emailSend: isEmailSend
          }
        },
        { status: 200 }
      );
    }

    // if validation code is provided, validate it
    const isValidationCode = await isSessionValidationCodeExists(
      sessionToken,
      userData?.validationCode
    );

    if (!isValidationCode) {
      return NextResponse.json(
        {
          error: 'Invalid validation code',
          messages: [
            'Validation code is invalid',
            'Please check your email and try again'
          ]
        },
        { status: 400 }
      );
    }

    const { id: onlineUserId } = await upsertOnlineUser(
      sessionToken,
      userData,
      isValidationCode
    );

    console.log('onlineUserId', onlineUserId);

    return NextResponse.json(
      {
        message: 'Onboarding successful',
        data: {
          userSession: sessionToken
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to process onboarding data' },
      { status: 400 }
    );
  }
}
