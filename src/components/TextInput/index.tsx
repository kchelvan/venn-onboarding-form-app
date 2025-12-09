import React from 'react';
import { View, Text, TextInput as _TextInput } from 'react-native';
import { TextInputProps } from './types';
import styles from './styles';

const TextInput = ({ label, error, ...textInputProps }: TextInputProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <_TextInput style={styles.input} {...textInputProps} />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

export default TextInput;
