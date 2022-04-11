import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';

import { auth } from '../../config/firebase';
import useAuthentication from "../../utils/hooks/useAuthentication";

import Fonts from '../../constant/Fonts';
import Colors from '../../constant/Colors';

import favourites, { renderItemFavourite } from './Home';
import MovieItem from '../../components/MovieItem';

const Profile = () => {
    const { user } = useAuthentication();

    const userImage = require('../../assets/user_mock.png');
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={userImage} style={styles.userImage} />
                <View style={styles.wrapper}>
                    <Text style={styles.emailText}>Email: {user?.email}</Text>
                    <Button title="Sign Out" titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => auth.signOut()} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-evenly',
        marginTop: 40
    },
    userImage: {
        resizeMode: 'contain',
        width: 80,
        height: 80
    },
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    emailText: {
        fontFamily: Fonts.HelveticaNeueBold,
        fontSize: 12
    },
    button: {
        backgroundColor: Colors.Red,
        marginVertical: 10
    },
    buttonText: {
        fontFamily: Fonts.HelveticaNeueBold,
        color: Colors.White,
        fontSize: 16
    }
})

export default Profile;