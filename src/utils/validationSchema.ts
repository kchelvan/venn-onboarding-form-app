import * as Yup from 'yup';
import { FormValues } from './types';

export const validationSchema: Yup.ObjectSchema<FormValues> =
  Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .max(50, 'First Name cannot exceed 50 characters'),
    lastName: Yup.string()
      .required('Last Name is required')
      .max(50, 'Last Name cannot exceed 50 characters'),
    phoneNumber: Yup.string()
      .required('Phone Number is required')
      .matches(
        /^\+1[0-9]{10}$/,
        'Must be a Canadian phone number starting with +1',
      ),
    corporationNumber: Yup.string()
      .required('Corporation Number is required')
      .matches(/^\d+$/, 'Phone Number can only contain numbers')
      .min(9, 'Corporation Number must be exactly 9 characters')
      .max(9, 'Corporation Number must be exactly 9 characters'),
  });
