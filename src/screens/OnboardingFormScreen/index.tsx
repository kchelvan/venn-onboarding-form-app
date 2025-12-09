import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { validationSchema } from '../../utils/validationSchema';
import styles from './styles';
import TextInput from '../../components/TextInput';
import SubmitButton from '../../components/Button';
import { FormValues } from '../../utils/types';

const OnboardingFormScreen = () => {
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
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>
                <View style={styles.nameInputContainer}>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      label="First Name"
                      onChangeText={handleChange('firstName')}
                      value={values.firstName}
                      error={errors.firstName}
                      touched={touched.firstName}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <TextInput
                      label="Last Name"
                      onChangeText={handleChange('lastName')}
                      value={values.lastName}
                      error={errors.lastName}
                      touched={touched.lastName}
                    />
                  </View>
                </View>
                <TextInput
                  label="Phone Number"
                  onChangeText={handleChange('phoneNumber')}
                  value={values.phoneNumber}
                  keyboardType="phone-pad"
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />
                <TextInput
                  label="Corporation Number"
                  onChangeText={handleChange('corporationNumber')}
                  value={values.corporationNumber}
                  keyboardType="phone-pad"
                  error={errors.corporationNumber}
                  touched={touched.corporationNumber}
                />
                <SubmitButton label="Submit" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingFormScreen;
