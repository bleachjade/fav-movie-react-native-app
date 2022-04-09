import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import * as Animatable from 'react-native-animatable';

import Home from '../src/screen/Home';
import Profile from '../src/screen/Profile';

import Colors from '../constant/Colors';

const Tab = createBottomTabNavigator();

const LightWeightTabs = () => {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: Colors.Pink,
            headerShown: false
          }}
        >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
            }}
        />
        
        </Tab.Navigator>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabBar: {
      height: 70,
      position: 'absolute',
      bottom: 16,
      right: 16,
      left: 16,
      borderRadius: 100,
      borderTopWidth: 0,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    btn: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 4,
      borderColor: Colors.White,
      backgroundColor: Colors.White,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circle: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.Pink,
      borderRadius: 25,
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
      color: Colors.Pink,
    }
  })

export default LightWeightTabs;