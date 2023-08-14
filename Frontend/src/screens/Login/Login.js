import { React, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';

const Login = ({ navigation }) => {
    var count = 0
    const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        if ((email === "" && password === "") || (email === "" || password === "")) {
            alert('Please enter login credentials')
        }
        else {
            axios.get(`https://test-api-m06e.onrender.com/users/login?email=${email}&password=${password}`)
                .then((response) => {
                    if (response.status === 200) {
                        navigation.navigate('Home')
                    }
                    else {
                        alert('Invalid login credentials')
                    }
                })
                .catch((error) => {
                    alert('Invalid login credentials')
                })
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.mainHeader}>Login</Text>
            </View>
            <View>
                <Text style={styles.labels}>Email address</Text>
                <TextInput id='email' value={email} style={styles.inputStyle} placeholder="abc@gmail.com" autoCapitalize='none' autoCorrect={false} onChangeText={(e) => setEmail(e)} />
            </View>
            <View>
                <Text style={styles.labels}>Password</Text>
                {
                    isChecked ? <TextInput id='password' value={password} style={styles.inputStyle} placeholder="password" autoCapitalize='none' autoCorrect={false} onChangeText={(e) => setPassword(e)} /> :
                        <TextInput id='password' value={password} style={styles.inputStyle} placeholder="password" autoCapitalize='none' autoCorrect={false} secureTextEntry={true} onChangeText={(e) => setPassword(e)} />
                }

            </View>
            <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={() => setChecked(!isChecked)} />
                <Text style={styles.paragraph}>Show password</Text>
            </View>
            <View style={styles.buttonView}>
                <Button title="Login" onPress={() => handleLogin()} />
            </View>
            <View>
                <Button title="click here to register" style={styles.newUser} onPress={() => navigation.navigate('Signup')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: "#fff",

    },
    mainHeader: {
        fontSize: 25,
        color: '#344055',
        fontWeight: "500",
        paddingTop: 20,
        paddingBottom: 15,
        textTransform: "capitalize",
    },
    labels: {
        fontSize: 18,
        color: "#7d7d7d",
        marginTop: 10,
        marginBottom: 5,
        lineHeight: 25
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 5,
        fontSize: 15
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginTop: 8,
        marginRight: 8,
    },
    paragraph: {
        fontSize: 15,
    },
    buttonView: {
        marginTop: 15,
        marginBottom: 15
    },
    newUser: {
        fontSize: 15,
        color: '#344055',
        fontWeight: "500",
        paddingTop: 15,
        paddingBottom: 15,
    },
})

export default Login