import { Alert } from 'react-native';
import { FormikHelpers } from 'formik';
import { FormValues } from '../utils/types';

export const useOnboardingSubmit = () => {
  const onSubmitHandler = async (
    submittedValues: FormValues,
    { setFieldError }: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await fetch(
        'https://fe-hometask-api.qa.vault.tryvault.com/profile-details',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submittedValues),
        },
      );

      const contentType = response.headers.get('content-type') || '';
      const responseData = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        if (responseData.message.toLowerCase().includes('first name')) {
          setFieldError('firstName', responseData.message);
        }
        if (responseData.message.toLowerCase().includes('last name')) {
          setFieldError('lastName', responseData.message);
        }
        if (responseData.message.toLowerCase().includes('phone')) {
          setFieldError('phone', responseData.message);
        }
        if (responseData.message.toLowerCase().includes('corporation')) {
          setFieldError('corporationNumber', responseData.message);
        }
        return;
      }
      Alert.alert('Registration complete!', 'User onboarding is successful.');
    } catch (error) {}
  };

  return { onSubmitHandler };
};
