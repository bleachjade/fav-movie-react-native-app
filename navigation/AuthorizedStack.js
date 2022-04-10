import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from "./MainTabs";

import SplashScreen from "../src/screen/SplashScreen";
import Home from '../src/screen/Home';

const Stack = createNativeStackNavigator();

const AuthorizedStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    // gesturesEnabled: false,
                    headerShown: false,
                    swipeEnabled: false,
                }}
            >
                {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
                {/* <Stack.Screen name="Home" component={Home} /> */}
                <Stack.Screen name="MainTabs" component={MainTabs} />
                {/* <MainTabs /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AuthorizedStack;