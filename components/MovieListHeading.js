import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Fonts from '../constant/Fonts';

const MovieListHeading = (props) => {
	return (
		<View style={styles.column}>
			<Text style={styles.applicationHeading}>{props.heading}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column'
    },
    applicationHeading: {
        fontSize: 28,
        fontFamily: Fonts.HelveticaNeueBold,
        textTransform: 'uppercase'
    },
})

export default MovieListHeading;