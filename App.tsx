import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingForm from './src/screens/OnboardingFormScreen';

function App() {
  return (
    <SafeAreaProvider>
      <OnboardingForm />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default App;
