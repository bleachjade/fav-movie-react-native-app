import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import * as Animatable from 'react-native-animatable';

import Home from '../src/screen/Home';
import Profile from '../src/screen/Profile';

import Colors from '../constant/Colors';

const TabArr = [
    { route: 'Home', label: 'Home', icon: 'home', component: Home },
    { route: 'Profile', label: 'Profile', icon: 'account', component: Profile },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -14 }, 1: { scale: 1.2, translateY: -4 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .3 }, 0.5: { scale: .7 }, 0.8: { scale: .9 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0.8 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <MaterialCommunityIcons name={item.icon} color={focused ? Colors.White : Colors.Pink} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const MainTabs = () => {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarStyle: styles.tabBar,
            headerShown: false
          }}
        >
        {TabArr.map((item, index) => {
            return (
            <Tab.Screen key={index} name={item.route} component={item.component}
                options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
                }}
            />
            )
        })}
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

export default MainTabs;