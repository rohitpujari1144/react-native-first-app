import { React, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import axios from 'axios';

const Signup = ({ navigation }) => {
    var count = 0
    const [isChecked, setChecked] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleRegister() {
        if ((name === "" && email === "" && mobile === "" && password === "" && confirmPassword === "") || (name === "" || email === "" || mobile === "" || password === "" || confirmPassword === "")) {
            alert('Please enter all fields')
        }
        else {
            if(password===confirmPassword && confirmPassword===password){
                userDetails = {
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: password,
                }
                await axios.post(`https://test-api-m06e.onrender.com/users/signup`, userDetails)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 201) {
                            console.log();
                            navigation.navigate('Login')
                        }
                        else {
                            alert('Email address already exist, use different one')
                        }
                    })
                    .catch((error) => {
                        alert('Email address already exist, use different one')
                    })
            }
            else{
                alert('Password and confirm password should be same')
            }
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.mainHeader}>Signup</Text>
            </View>
            <View>
                <Text style={styles.labels}>Name</Text>
                <TextInput value={name} style={styles.inputStyle} placeholder="John" autoCorrect={false} onChangeText={(e) => setName(e)} />
            </View>
            <View>
                <Text style={styles.labels}>Email address</Text>
                <TextInput value={email} style={styles.inputStyle} placeholder="john@gmail.com" autoCapitalize='none' autoCorrect={false} onChangeText={(e) => setEmail(e)} />
            </View>
            <View>
                <Text style={styles.labels}>Mobile number</Text>
                <TextInput value={mobile} style={styles.inputStyle} placeholder="1234567890" autoCapitalize='none' autoCorrect={false} onChangeText={(e) => setMobile(e)} keyboardType='numeric' />
            </View>
            <View>
                <Text style={styles.labels}>Password</Text>
                {
                    isChecked ? <TextInput id='password' value={password} style={styles.inputStyle} placeholder="password" autoCapitalize='none' autoCorrect={false} onChangeText={(e) => setPassword(e)} /> :
                        <TextInput id='password' value={password} style={styles.inputStyle} placeholder="******" autoCapitalize='none' autoCorrect={false} secureTextEntry={true} onChangeText={(e) => setPassword(e)} />
                }
            </View>
            <View>
                <Text style={styles.labels}>Confirm password</Text>
                {
                    isChecked ? <TextInput id='password' value={confirmPassword} style={styles.inputStyle} placeholder="password" autoCapitalize='none' autoCorrect={false} onChangeText={(e) => setConfirmPassword(e)} /> :
                        <TextInput id='password' value={confirmPassword} style={styles.inputStyle} placeholder="******" autoCapitalize='none' autoCorrect={false} secureTextEntry={true} onChangeText={(e) => setConfirmPassword(e)} />
                }
            </View>
            <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={() => setChecked(!isChecked)} />
                <Text style={styles.paragraph}>Show password</Text>
            </View>
            <View style={styles.buttonView}>
                <Button title="Register" onPress={() => handleRegister()} />
            </View>
            <View>
                <Button title="back to login" style={styles.newUser} onPress={() => navigation.navigate('Login')} />
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
        marginTop: 10,
        marginRight: 10,
    },
    paragraph: {
        fontSize: 15,
        marginTop: 10,
    },
    buttonView: {
        marginTop: 15,
        marginBottom: 10,
    },
    newUser: {
        fontSize: 15,
        color: '#344055',
        fontWeight: "500",
        paddingTop: 15,
        paddingBottom: 15,
    },
})

export default Signup