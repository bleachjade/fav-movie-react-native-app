import { NavigationContainer } from '@react-navigation/native';

import MainTabs from './navigation/MainTabs';
import LightWeightTabs from './navigation/LightWeightTabs';

const App = () => {
  return (
    <NavigationContainer>
      <LightWeightTabs />
    </NavigationContainer>
  );
}

export default App;
