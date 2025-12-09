import { TextInputProps as _TextInputProps } from 'react-native';

export interface TextInputProps extends _TextInputProps {
  label: string;
  error?: string;
}

export default TextInputProps;
