import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth';

import LoginScreen from './screens/Auth/LoginScreen'
import SignUp from './screens/Auth/SignUp';
import CreateAd from './screens/userscreen/CreateAd';
import Account from './screens/userscreen/Account';
import EditScreen from './screens/userscreen/EditScreen';
import HomeScreen from './screens/userscreen/HomeScreen';

const MainScreen = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'deepskyblue',
    },
  };

  const Navigation = () => {
    const [user, setUser] = useState('')

    useEffect(() => {
      userExist()
    }, [])

    const userExist = () => {
      auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          setUser(user)
        } else {
          setUser('')
        }
      }
      )
    }

    const AuthNavigation = () => {
      const Stack = createStackNavigator()
      return (
        <Stack.Navigator screenOptions={{headerShown:false}}> 
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
      )
  
    }

    const StackNavigation = () => {
      const Stack = createStackNavigator()
      return (
        <Stack.Navigator screenOptions={{headerShown:false}}> 
          <Stack.Screen name='TabNavigator' component={TabNavigator} />
          <Stack.Screen name='EditScreen' component={EditScreen} />
        </Stack.Navigator>
      )
  
    }
  
    const TabNavigator = () => {
      const Tab = createBottomTabNavigator()
      return (
        <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => {
            let IconName;
            if (route.name == 'HomeScreen') {
              IconName = 'home'
            }
            else if (route.name == 'CreateAd') {
              IconName = 'plus-circle'
            }
            else {
              IconName = 'user'
            }
            return (
              <View style={{ height: 70, backgroundColor: "#fff", borderRadius: 50, borderWidth: 1, padding: 10, borderColor: "#fff" }}>
                <Feather name={IconName} size={30} />
              </View>
            )
          }
        })}
        >
          <Tab.Screen name='HomeScreen' component={HomeScreen} options={{ title: "" }} />
          <Tab.Screen name='CreateAd' component={CreateAd} options={{ title: "" }} />
          <Tab.Screen name='Account' component={Account} options={{ title: "" }} />
        </Tab.Navigator>
      )
    }

    return (
      <NavigationContainer >
         {
          user ? (<StackNavigation/>) : <AuthNavigation/>
         }
      </NavigationContainer>
    )
  }

  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  )
}

export default MainScreen

const styles = StyleSheet.create({})