import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import CustomInput from '../Components/CustomInput'

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState({
        error: false,
        text: ''
    })
    const [passwordError, setPasswordError] = useState({
        error: false,
        text: ''
    })



    const register = async () => {
        try {
            if (!email || !password) {
                alert('Please filled the required fields')
            } else {
                const result = await auth().createUserWithEmailAndPassword(email, password)
                await auth().signOut()
                    .then(() => console.log('User signed out!'));
                console.log(result.user)
                setEmailError({
                    error: false,
                    text: ''
                })
                setPasswordError({
                    error: false,
                    text: ''
                })

                console.log(emailError, passwordError)
            }
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                setEmailError({
                    error: true,
                    text: 'This email is already taken'
                })
                setPasswordError({
                    error: false,
                    text: ''
                })
            }
            if (error.code == 'auth/weak-password') {
                setPasswordError({
                    error: true,
                    text: 'Please enter 6 digits of password'
                })
                setEmailError({
                    error: false,
                    text: 'This email is already taken'
                })
            }
            console.log(error)
        }

    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imgContainer}>
                <Image style={styles.imgStyle} source={require('../assets/cnqlogo.png')} />
                <Text style={styles.title}>Create an account</Text>
            </View>

            <View >
                <CustomInput
                    label="Email"
                    value={email}
                    mode={'outlined'}
                    onChangeText={setEmail}
                />

                {
                    emailError.error &&
                    <Text style={{ color: "red" }}>{emailError.text}</Text>}
                <CustomInput
                    label="Password"
                    value={password}
                    mode={'outlined'}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                {
                    passwordError.error &&
                    <Text style={{ color: "red" }}>{passwordError.text}</Text>}
            </View>

            <Button
                onPress={register}
                style={{ marginTop: 20 }}
                mode="contained"
            >
                Press me
            </Button>
            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.goBack()}>
                <Text style={{ color: 'blue' }}>Have an account?</Text>
            </TouchableOpacity>

        </View>
    )

}
export default SignUp

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 50
    },
    imgContainer: {
        alignItems: "center",
    },
    imgStyle: {
        width: 200,
        height: 140
    },
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    inputStyle: {
        marginTop: 20
    }
})