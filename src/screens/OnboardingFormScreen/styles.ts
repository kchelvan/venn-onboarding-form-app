import { StyleSheet } from 'react-native';
import COLORS from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGrey,
  },
  content: {
    marginHorizontal: 16,
  },
  nameInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  stepIndicator: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 16,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default styles;
