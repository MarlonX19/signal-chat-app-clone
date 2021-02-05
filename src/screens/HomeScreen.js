import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})