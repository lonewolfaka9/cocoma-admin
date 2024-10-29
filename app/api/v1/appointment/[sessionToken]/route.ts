import {
  AppointmentRequestType,
  AppointmentServiceItemType,
  appointmentSchema,
  onlineUserSchema
} from '@/lib/user-schema';

import { NextResponse } from 'next/server';
import { getSessionByToken } from '@/app/helpers/session-helper';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { sessionToken: string } }
) {
  const sessionToken = params.sessionToken;
  const { sessionId, onlineUserId } = await getSessionByToken(sessionToken);

  if (!sessionId) {
    return NextResponse.json(
      {
        error: 'Invalid Session'
      },
      { status: 400 }
    );
  }

  if (!onlineUserId) {
    return NextResponse.json(
      {
        error: 'No user found for this session'
      },
      { status: 400 }
    );
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      userId: onlineUserId,
      isDeleted: false
    }
  });

  const responseResult = appointments?.map((appointment) => {
    return {
      company: appointment.company,
      createdAt: appointment.createdAt,
      title: appointment.title,
      description: appointment.description,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      startDateTime: appointment?.startDateTime,
      endDateTime: appointment?.endDateTime,
      actualDate: appointment?.actualDate
    };
  });

  return NextResponse.json(responseResult);
}

export async function POST(
  request: Request,
  { params }: { params: { sessionToken: string } }
) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    console.log('Received onboarding data:', body);

    const sessionToken = params.sessionToken;
    // const {
    //   success: isValidUserInput,
    //   data: userData,
    //   error
    // } = onlineUserSchema.safeParse(body);
    // if (!isValidUserInput) {
    //   return NextResponse.json(
    //     {
    //       error: 'Invalid onboarding data',
    //       messages: error?.issues.map((issue) => issue.message)
    //     },
    //     { status: 400 }
    //   );
    // }

    const {
      success: isValidAppointmentInput,
      data: appointmentData,
      error: appointmentError
    } = appointmentSchema.safeParse(body?.appointment);

    if (!isValidAppointmentInput) {
      return NextResponse.json(
        {
          error: 'Invalid appointment data',
          messages: appointmentError?.issues.map((issue) => issue.message),
          data: appointmentData
        },
        { status: 400 }
      );
    }

    const serviceItems: AppointmentServiceItemType[] =
      body?.appointment?.serviceItems || [];

    // const { id: onlineUserId } = await upsertOnlineUser(sessionToken, userData);
    // updateSession(sessionToken, onlineUserId);
    const { onlineUserId } = await getSessionByToken(sessionToken);
    if (!onlineUserId) {
      return NextResponse.json(
        {
          error: 'No user found for this session'
        },
        { status: 400 }
      );
    }

    const { id: appointmentGuid } = await createAppointment(
      appointmentData,
      onlineUserId
    );

    await createAppointmentServiceItems(appointmentGuid, serviceItems);

    return NextResponse.json(
      {
        message: 'Appointment created successfully',
        data: {
          userSession: sessionToken,
          appointmentId: appointmentGuid
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to process appointment data' },
      { status: 400 }
    );
  }
}

// const updateSession = async (sessionToken: string, onlineUserId: number) => {
//   const session = await prisma.onlineUserSession.upsert({
//     where: {
//       sessionId: sessionToken
//     },
//     update: {
//       onlineUserId
//     },
//     create: {
//       onlineUserId,
//       sessionId: sessionToken
//     }
//   });

//   return session;
// };

// const upsertOnlineUser = async (
//   sessionToken: string,
//   userData: OnlineRegisterUserType
// ) => {
//   const { onlineUserId } = await getSessionByToken(sessionToken);
//   const user = await prisma.onlineUser.upsert({
//     where: {
//       id: onlineUserId || -1
//     },
//     update: {
//       ...userData
//     },
//     create: {
//       ...userData
//     }
//   });

//   return user;
// };

const createAppointment = async (
  appointmentData: AppointmentRequestType,
  onlineUserId: number
) => {
  const appointment = await prisma.appointment.create({
    data: {
      ...appointmentData,
      userId: onlineUserId
    }
  });

  return appointment;
};

const createAppointmentServiceItems = async (
  appointmentId: string,
  serviceItems: AppointmentServiceItemType[]
) => {
  const appointmentServiceItems = serviceItems.map((serviceItem) => {
    return {
      ...serviceItem,
      appointmentId
    };
  });

  const createdServiceItems = await prisma.appointmentServiceItem.createMany({
    data: appointmentServiceItems
  });

  return createdServiceItems;
};
