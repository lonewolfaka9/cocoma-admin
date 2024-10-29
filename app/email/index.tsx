import { ConfirmEmailAddressTemplate } from './confirm-email';
import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';

const COMPANY_EMAIL_FROM =
  process.env.COMPANY_EMAIL_FROM ?? 'invite@portal.cocomastudiosindia.com';

// const transporter = nodemailer.createTransport({
//   // host: 'smtp.forwardemail.net',
//   // port: 465,
//   // secure: true,
//   service: 'gmail',
//   auth: {
//     user: GMAIL_EMAIL_ACCOUNT,
//     pass: GMAIL_PASSWORD
//   }
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'invite@portal.cocomastudiosindia.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

// IS_EMAIL_ENABLED
const sendEmail = async (options: Mail.Options) => {
  if (process.env.IS_EMAIL_ENABLED === 'false') {
    console.log('Email sending is disabled');
    return true;
  }

  try {
    await transporter.sendMail(options);
    console.log('Email sent');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export type ConfirmEmailAddressMailType = {
  emailAddressToConfirm: string;
  validationCode: string;
  sessionToken: string;
};

export const sendConfirmEmailAddressMail = async ({
  emailAddressToConfirm,
  validationCode,
  sessionToken
}: ConfirmEmailAddressMailType) => {
  const emailHtml = await render(
    <ConfirmEmailAddressTemplate validationCode={validationCode} />
  );

  console.log(
    'sendConfirmEmailAddressMail: emailAddressToConfirm',
    emailAddressToConfirm
  );

  const options = {
    from: COMPANY_EMAIL_FROM,
    to: emailAddressToConfirm,
    subject: 'Confirm your email address',
    html: emailHtml
  };
  return sendEmail(options);
};
