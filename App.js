import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import MainTabs from './navigation/MainTabs';
// import LightWeightTabs from './navigation/LightWeightTabs';

import MainNavigator from './navigation/MainNavigator';
// import LoginMock from './src/screen/LoginMock';
// import HomeMock from './src/screen/HomeMock';

// import './config/firebase';

// const Stack = createNativeStackNavigator();

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
    // <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginMock} />
    //       <Stack.Screen name="Home" component={HomeMock} />
    //     </Stack.Navigator>
    // </NavigationContainer>
    <MainNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
