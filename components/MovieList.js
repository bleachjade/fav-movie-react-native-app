import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const MovieList = (props) => {
	return (
		<View style={styles.container}>
			{props.movies.map((movie, index) => {
                return (
                    
                    <View key={index} style={styles.imageContainer}>
                        {/* <Text>{movie.Title}</Text> */}
                        <Image style={styles.imageObject} source={{ uri: movie.Poster }} />
                    </View>
                )
            })}
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        // flex: 1
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height: 180,
        width: 110
    },
    imageObject: {
        // resizeMode: 'stretch',
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
});

export default MovieList;