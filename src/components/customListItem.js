import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';


const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: 'https://placebeard.it/360x360'
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }} >
          Youtube chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          this is a test subtitle in order to check what it will look like in a real app
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem;

const styles = StyleSheet.create({

})