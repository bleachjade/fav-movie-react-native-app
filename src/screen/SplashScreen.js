import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

import Colors from '../../constant/Colors';
import useAuthentication from "../../utils/hooks/useAuthentication";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const { user } = useAuthentication();

  const appLogo = require("../../assets/fav_logo.png");

  const componentDidMount = () => {
    setTimeout( () => {load()}, 2000);       
  }
  const load = () => {
     if (user) {
         navigation.navigate('Home');
     }
     navigation.navigate('SignIn');
  }

  return (
    <View style={styles.container}>
      <Image
        source={appLogo}
        style={{ width: "70%", resizeMode: "contain", margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      {componentDidMount()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Pink,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  loadingText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  loadingTextContainer: {
    width: "80%",
  },
});

export default SplashScreen;
