import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';

const SearchBox = (props) => {
	return (
		<View style={styles.column}>
			<TextInput
                style={styles.input}
                value={props.value}
                onChangeText={(value) => props.setSearchValue(value)}
                placeholder="Search Movie..."
            />
		</View>
	);
};

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column'
    },
    input: {
        height: 10
    }
})

export default SearchBox;