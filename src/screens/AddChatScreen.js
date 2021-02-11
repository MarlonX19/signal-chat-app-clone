import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { db } from '../../firebase';


const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState('');


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add new chat',
      headerBackTitle: 'Chats'
    })
  }, [navigation])

  const createChat = async () => {
    await db.collection('chats').add({
      chatName: input
    }).then(() => {
      navigation.goBack();
    }).catch(error => {
      alert(error.message)
    })
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color='black' />
        }
      />
      <Button disabled={!input} title='Create chat' onPress={createChat} />
    </View>
  )
}

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    height: '100%'
  }
})