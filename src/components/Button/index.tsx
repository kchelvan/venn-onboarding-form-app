import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ButtonProps } from './types';
import styles from './styles';

const Button = ({ onPress, label }: ButtonProps) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    {label && <Text style={styles.buttonText}>{label}</Text>}
  </TouchableOpacity>
);

export default Button;
