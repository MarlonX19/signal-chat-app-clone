import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

import { auth } from '../../firebase';


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useLayoutEffect(() => {
    console.log(navigation)
    navigation.setOptions({
      headerBackTitle: 'login'
    });

  }, [navigation])

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || 'https://thispersondoesnotexist.com/'
        })
      }).catch(error => Alert.alert(error.message))
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container} >
      <StatusBar style='light' />
      <Text h3 style={{ marginBottom: 50 }} >
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full name'
          autoFocus
          type='text'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder='Email'
          autoFocus
          type='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type='password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder='Profile pic url (optional)'
          type='text'
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title='Register'
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen;

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
