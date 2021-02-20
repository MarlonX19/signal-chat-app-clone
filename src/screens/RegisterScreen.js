import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert, Platform, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { db, auth, storage } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [imageSelected, setImageSelected] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [imageId, setImageId] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1)
  }

  const uniqueId = () => {
    return 'marlonImage' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'login'
    });

  }, [navigation])

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: downloadUrl || 'https://placebeard.it/360x360'
        })
      }).catch(error => Alert.alert(error.message))
  }

  const choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      setImageUrl(result.uri);
      setImageId(uniqueId());
      setImageSelected(true);
      uploadPublish(result.uri);
    }
  }

  const uploadPublish = (resultUri) => {
    uploadImage(resultUri);
  }

  const uploadImage = async (uri) => {
    console.log("=====uri da imagem aqui=======", uri);
    console.log(uri);
    var currentUserId = 'test';

    const response = await fetch(uri);
    const blob = await response.blob()
    var filePath = imageId // + '.' + currentFileType

    var uploadTask = storage.ref('user').child(filePath).put(blob)

    uploadTask.on('state_changed', function (snapshot) {
      var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(progress)
    }, function (error) {
      console.log('error======', error)
    }, function () {
      setProgress(100)
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setDownloadUrl(downloadURL);
      })

    })

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
        <TouchableOpacity onPress={choosePhoto}>
          <Image
            source={{
              uri: downloadUrl
                ||
                'https://static.thenounproject.com/png/182919-200.png'
            }}
            style={{ alignSelf: "center", width: 100, height: 100 }}
          />
        </TouchableOpacity>
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
