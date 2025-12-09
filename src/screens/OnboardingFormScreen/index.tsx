import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { validationSchema } from '../../utils/validationSchema';
import styles from './styles';
import TextInput from '../../components/TextInput';
import SubmitButton from '../../components/Button';
import { FormValues } from '../../utils/types';
import {
  CorporationValidationResponse,
  useCorporationNumberValidation,
} from '../../hooks/useCorporationValidation';

const OnboardingFormScreen = () => {
  const { validateCorporationNumber } = useCorporationNumberValidation();
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    corporationNumber: '',
  };

  const handleSubmit = (values: FormValues) => {
    console.log('Submitted form values:', values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.stepIndicator}>Step 1 of 5</Text>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Onboarding Form</Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldError,
              values,
              errors,
              touched,
            }) => {
              const handleOnBlur = (field: keyof FormValues) => async () => {
                handleBlur(field);

                if (
                  field === 'corporationNumber' &&
                  !errors.corporationNumber
                ) {
                  const corporationDataResponse: CorporationValidationResponse =
                    await validateCorporationNumber(values.corporationNumber);

                  if (!corporationDataResponse?.valid) {
                    setFieldError(
                      'corporationNumber',
                      corporationDataResponse.message,
                    );
                  }
                }
              };

              return (
                <View>
                  <View style={styles.nameInputContainer}>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        label="First Name"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleOnBlur('firstName')}
                        value={values.firstName}
                        error={errors.firstName}
                        touched={touched.firstName}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        label="Last Name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleOnBlur('lastName')}
                        value={values.lastName}
                        error={errors.lastName}
                        touched={touched.lastName}
                      />
                    </View>
                  </View>
                  <TextInput
                    label="Phone Number"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleOnBlur('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                    error={errors.phoneNumber}
                    touched={touched.phoneNumber}
                  />
                  <TextInput
                    label="Corporation Number"
                    onChangeText={handleChange('corporationNumber')}
                    onBlur={handleOnBlur('corporationNumber')}
                    value={values.corporationNumber}
                    keyboardType="phone-pad"
                    error={errors.corporationNumber}
                    touched={touched.corporationNumber}
                  />
                  <SubmitButton label="Submit" onPress={handleSubmit} />
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingFormScreen;
