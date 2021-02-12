import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import { db, auth } from '../../firebase';


const CustomListItem = ({ id, chatName, enterChat, mostRecentMessage }) => {
  const [chatMessages, setChatMessages] = useState([]);
  let test = new Date(mostRecentMessage);
  let res = `${test.toLocaleDateString()} ${test.toLocaleTimeString()}`;

  console.log('========mostRecentMessage');
  console.log(res)



  useEffect(() => {
    const unsubscribe = db.collection('chats').doc(id).collection('messages')
      .orderBy('timestamp', 'desc').onSnapshot(snapshot => (
        setChatMessages(snapshot.docs.map(doc => doc.data()))
      ))

    return unsubscribe;
  }, [])

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        size={50}
        rounded
        source={{
          uri: chatMessages?.[0]?.photoURL || 'https://placebeard.it/360x360'
        }}
      />
      <ListItem.Content>
        <View style={styles.listItemTop}>
          <ListItem.Title style={{ fontWeight: '800' }} >
            {chatName}
          </ListItem.Title>
          <Text style={styles.listItemLastMessage}>{res}</Text>
        </View>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem;

const styles = StyleSheet.create({
  listItemTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  listItemLastMessage: {
    color: '#696969',
    fontSize: 10
  }
})