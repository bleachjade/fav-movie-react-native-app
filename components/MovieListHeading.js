import React from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

import FadeInView from './FadeInView';

import Fonts from '../constant/Fonts';
import Colors from '../constant/Colors';

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
        textTransform: 'uppercase',
        color: Colors.Pink
    },
})

export default MovieListHeading;