import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'

const Account = ({navigation}) => {
  const logout = ()=>{
     auth().signOut()
  }
  return (
    <View style={{justifyContent:"center",flex:1,paddingHorizontal:24}}>
        <TouchableOpacity 
        onPress={logout}
        style={styles.logoutBtn}
        >
           <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  logoutBtn:{
    paddingVertical:10,
    backgroundColor:"deepskyblue",
    alignItems:"center",
    borderRadius:10
  }
})