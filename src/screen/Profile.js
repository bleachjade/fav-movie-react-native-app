import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth } from '../../config/firebase';
import useAuthentication from "../../utils/hooks/useAuthentication";

const Profile = () => {
    const { user } = useAuthentication();
    return (
        <SafeAreaView>
            <Text>Welcome {user?.email}!</Text>
            <Button title="Sign Out" style={styles.button} onPress={() => auth.signOut()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default Profile;