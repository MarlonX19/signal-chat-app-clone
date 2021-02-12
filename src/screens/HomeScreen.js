import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import CustomListItem from '../components/customListItem';
import { StatusBar } from 'expo-status-bar';

import { auth, db } from '../../firebase';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
      let temp = [];
      temp = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      temp.sort((a, b) => {
        if (a.data.mostRecentMessage < b.data.mostRecentMessage) {
          return 1;
        }
        if (a.data.mostRecentMessage > b.data.mostRecentMessage) {
          return -1;
        }
        return 0;
      })
      setChats(temp)
    })

    return unsubscribe;
  }, [])

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Login')
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' size={24} color='black' />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName
    })
  }

  return (
    <SafeAreaView>
      <StatusBar style='dark' />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName, mostRecentMessage } }) => (
          <CustomListItem mostRecentMessage={mostRecentMessage} enterChat={() => enterChat(id, chatName)} key={id} id={id} chatName={chatName} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})