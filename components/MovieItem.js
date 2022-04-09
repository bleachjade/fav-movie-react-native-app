import React from 'react';
import { View, Image, StyleSheet, Text, ImageBackground } from 'react-native';
import Colors from '../constant/Colors';
import Fonts from '../constant/Fonts';

const MovieItem = ({poster, rating}) => {
    const vector = require('../assets/yellow_bookmark.png');
	return (
        <View style={styles.imageContainer}>
            <Image style={styles.imageObject} source={{ uri: poster }} />
            <ImageBackground source={vector} style={styles.vectorImage}>
                <Text style={styles.ratingText}>{rating}</Text>
            </ImageBackground>
        </View>
	);
};

const styles = StyleSheet.create({
    // container: {
    //     // flex: 1
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    imageContainer: {
        height: 180,
        width: 110,
        marginHorizontal: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        marginBottom: 20,
        marginTop: 1
    },
    imageObject: {
        // resizeMode: 'stretch',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 4,
    },
    vectorImage: {
        width: 25,
        position: 'absolute',
        top: -1,
        left: 8,
        color: Colors.White,
        // paddingHorizontal: 4,
        // paddingVertical: 10,
        height: 35,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover'
    },
    ratingText: {
        textAlign: 'center',
        fontSize: 11,
        fontFamily: Fonts.HelveticaNeueBold
    },
});

export default MovieItem;