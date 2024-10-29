import { TypeOf, boolean, object, string } from 'zod';

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const onlineUserSchema = object({
  firstName: string({ required_error: 'First Name is required' }).min(
    1,
    'Name is required'
  ),
  lastName: string({ required_error: 'Last Name is required' }).min(
    1,
    'Last Name is required'
  ),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  mobile: string().refine(
    (value) => {
      return phoneRegex.test(value);
    },
    { message: 'Invalid mobile number' }
  ),
  validationCode: string().optional()
});

export type OnlineRegisterUserType = TypeOf<typeof onlineUserSchema>;

//create a schema for the appointment

export const appointmentSchema = object({
  company: string().optional(),
  socialMediaLink: string().url().optional(),
  title: string({ required_error: 'Title is required' }).min(
    1,
    'Title is required'
  ),
  description: string({ required_error: 'description is required' }).min(
    1,
    'Description is required'
  ),
  startDateTime: string({ required_error: 'StartTime is required' }),
  endDateTime: string({ required_error: 'End Time is required' }),
  startTime: string().optional(),
  endTime: string().optional(),
  actualDate: string().optional(),
  privacyAccepted: boolean({ required_error: 'Privacy is required' })
});

export type AppointmentRequestType = TypeOf<typeof appointmentSchema>;

const serviceItemSchema = object({
  sku: string({ required_error: 'Appointment Service Item is required' }).min(
    1,
    'SKU is required'
  ),
  occurrences: string({
    required_error: 'Appointment Service Occurrences is required'
  }).min(1, 'Occurrences is required')
});

export type AppointmentServiceItemType = TypeOf<typeof serviceItemSchema>;
