import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';

import { db, auth } from '../../firebase';


const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('');

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL
    })

    setInput('');
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Avatar rounded source={{ uri: 'https://placebeard.it/360x360' }} />
          <Text style={{ color: '#fff', marginLeft: 10, fontWeight: '700' }}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name='arrowleft' size={24} color='#fff' />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80
          }}
        >
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color='#fff' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <>
          <ScrollView>
            <Text>chat goes here</Text>
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              onChangeText={text => setInput(text)}
              style={styles.textInput}
              placeholder='Type something here'
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
              <Ionicons name='send' color='#2b68e6' size={24} />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },

  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: 'transparent',
    backgroundColor: '#ececec',
    borderWidth: 1,
    padding: 10,
    color: 'grey',
    borderRadius: 30
  }
})