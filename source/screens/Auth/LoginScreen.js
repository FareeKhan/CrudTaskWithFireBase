import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import CustomInput from '../../Components/CustomInput'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLaoder, setIsLoader] = useState(false)

    const login = async () => {
        setIsLoader(true)
        try {
            if (!email || !password) {
                alert('Please fill all fields')
            } else {
                await auth().signInWithEmailAndPassword(email, password)
            }
            setIsLoader(false)

        } catch (error) {
            setIsLoader(false)
            console.log(error)
            if (error.code == 'auth/invalid-email') {
                alert('Email Formate is not Correct.')
              }      
                if (error.code == 'auth/network-request-failed') {
                alert('Please Check your internet')
              }   
                if (error.code == 'auth/too-many-requests') {
                alert('We have blocked all requests from this device due to unusual activity. Try again later.')
              }
            if (error.code == 'auth/wrong-password') {
                alert('The password is invalid or the user does not have a password')
            }
            if (error.code == 'auth/user-not-found') {

                alert('There is no user record corresponding to this identifier. The user may have been deleted.')

            }
        }
    }

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.imgContainer}>
                <Image style={styles.imgStyle} source={require('../../assets/cnqlogo.png')} />
                <Text style={styles.title}>Please Login to Continue</Text>
            </View>
            <View>
                <CustomInput
                    label="Email"
                    value={email}
                    mode={'outlined'}
                    onChangeText={setEmail}
                />
                <CustomInput
                    label="Password"
                    value={password}
                    mode={'outlined'}
                    secureTextEntry
                    onChangeText={setPassword}
                />
            </View>
            {isLaoder ?
                <ActivityIndicator size={22} color={'deepskyblue'} style={{ marginTop: 20 }} /> :
                <Button style={{ marginTop: 20 }} mode="contained" onPress={login}>
                    Login
                </Button>}

            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ color: 'blue' }}>Dont have an account ?</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default LoginScreen

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
        fontWeight: "500",
        color:'#000'
    },
    inputStyle: {
        marginTop: 20
    }
})