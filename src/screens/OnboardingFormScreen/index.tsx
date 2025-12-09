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
import { useOnboardingSubmit } from '../../hooks/useOnboardingSubmit';

const OnboardingFormScreen = () => {
  const { validateCorporationNumber } = useCorporationNumberValidation();
  const { onSubmitHandler } = useOnboardingSubmit();
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    phone: '',
    corporationNumber: '',
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
            onSubmit={onSubmitHandler}
            validateOnChange={false}
            validateOnBlur={true}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldError,
              setFieldTouched,
              values,
              errors,
              touched,
            }) => {
              const handleOnBlur = (field: keyof FormValues) => async () => {
                handleBlur(field);
                setFieldTouched(field, true, true);

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
                        id="firstName"
                        label="First Name"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleOnBlur('firstName')}
                        value={values.firstName}
                        error={errors.firstName}
                        touched={touched.firstName}
                        accessible
                        accessibilityLabel="First Name"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        id="lastName"
                        label="Last Name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleOnBlur('lastName')}
                        value={values.lastName}
                        error={errors.lastName}
                        touched={touched.lastName}
                        accessible
                        accessibilityLabel="Last Name"
                      />
                    </View>
                  </View>
                  <TextInput
                    id="phone"
                    label="Phone Number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleOnBlur('phone')}
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone}
                    aria-label="Phone Number"
                    accessible
                    accessibilityLabel="Phone Number"
                  />
                  <TextInput
                    id="corporationNumber"
                    label="Corporation Number"
                    onChangeText={handleChange('corporationNumber')}
                    onBlur={handleOnBlur('corporationNumber')}
                    value={values.corporationNumber}
                    keyboardType="phone-pad"
                    error={errors.corporationNumber}
                    touched={touched.corporationNumber}
                    accessible
                    accessibilityLabel="Corporation Number"
                  />
                  <SubmitButton
                    label="Submit"
                    onPress={handleSubmit}
                    accessible
                    accessibilityLabel="Submit Button"
                  />
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
