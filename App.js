import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Routes from './src/routes';
import { AuthenticationContext } from './src/contexts';


export default function App() {
  return (
    <NavigationContainer>
      <AuthenticationContext>
        <Routes />
      </AuthenticationContext>
    </NavigationContainer>
  );
}
