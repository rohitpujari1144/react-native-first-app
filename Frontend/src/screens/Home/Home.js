import { React, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';

const Home = ({navigation}) => {

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.welcomeMessage}>Welcome to Home !</Text>
            <View style={styles.buttonView}>
                <Button title="Logout" onPress={() => navigation.goBack('Login')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        paddingHorizontal: 30,
        backgroundColor: "#fff",

    },
    welcomeMessage: {
        fontSize: 25,

    },
    buttonView: {
        width: '50%',
        marginTop: 15
    },
})

export default Home