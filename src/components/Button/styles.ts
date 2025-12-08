import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 600,
  },
});

export default styles;
