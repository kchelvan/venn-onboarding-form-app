import * as Yup from 'yup';
import { FormValues } from './types';

export const validationSchema: Yup.ObjectSchema<FormValues> =
  Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    corporationNumber: Yup.string().required('Corporation Number is required'),
  });
