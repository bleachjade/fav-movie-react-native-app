import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const MovieItem = ({poster}) => {
	return (
        <View style={styles.imageContainer}>
            <Image style={styles.imageObject} source={{ uri: poster }} />
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
        marginHorizontal: 8
    },
    imageObject: {
        // resizeMode: 'stretch',
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default MovieItem;