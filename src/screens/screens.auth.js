import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();


const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff'
}


const AuthScreens = () => {
  return (
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name='Login'
          component={LoginScreen} />
        <Stack.Screen
          name='Register'
          component={RegisterScreen} />
      </Stack.Navigator>
  )
}

  export default AuthScreens;
