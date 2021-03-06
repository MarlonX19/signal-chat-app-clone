import React, { useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { Input, Image, Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../hooks';

const LoginScreen = ({ navigation }) => {
  const { handleSignIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function SignIn() {
    handleSignIn(email, password);
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='light' />
      <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png' }} style={{ width: 200, height: 200 }} />
      <View style={styles.inputContainer}>
        <Input
          placeholder='E-mail'
          autoFocus type='email'
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <Input
          placeholder='Password'
          secureTextEntry
          type='password'
          value={password}
          onChangeText={txt => setPassword(txt)}
        />
      </View>
      <Button containerStyle={styles.button} onPress={() => SignIn()} title='Login' />
      <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type='outline' title='Register' />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  inputContainer: {
    width: 300
  },

  button: {
    width: 200,
    marginTop: 10
  }
})