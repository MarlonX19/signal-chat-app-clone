import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import AddChatScreen from "./AddChatScreen";
import ChatScreen from "./AddChatScreen";
import UserScreen from "./UserDetailScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: '#fff' },
  headerTintColor: '#fff'
}

const AppScreens = () => {
  return (
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name='Home'
          component={HomeScreen} />
        <Stack.Screen
          name='AddChat'
          component={AddChatScreen} />
        <Stack.Screen
          name='Chat'
          component={ChatScreen} />
        <Stack.Screen
          name='User'
          component={UserScreen} />
      </Stack.Navigator>
  )
}

export default AppScreens;