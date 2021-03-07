import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { auth, db, storage } from '../../firebase';

const UserScreen = ({ navigation, route }) => {
  const [profilePic, setProfilePic] = useState(auth?.currentUser?.photoURL);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [updatingPhoto, setUpdatingPhoto] = useState(false);

  const nav = useNavigation();

  const imageProgress = useRef(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My profile"
    })
  }, [])

  useEffect(() => {
    if (downloadUrl) {
      auth.currentUser.updateProfile({
        photoURL: downloadUrl
      }).then(() => {
        setProfilePic(downloadUrl);
        setUpdatingPhoto(false);
      }).catch(() => {
        setUpdatingPhoto(false);
        Alert.alert("Error updating profile picture")
      });
    }

  }, [downloadUrl]);

  const choosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      uploadPublish(result.uri);
    }
  }

  const uploadPublish = (resultUri) => {
    uploadImage(resultUri);
  }

  const uploadImage = async (uri) => {
    setUpdatingPhoto(true);
    var currentUserId = 'user';

    const response = await fetch(uri);
    const blob = await response.blob();
    var filePath = String(Date.now()); // + '.' + currentFileType


    var uploadTask = storage.ref(currentUserId).child(filePath).put(blob)

    uploadTask.on('state_changed', function (snapshot) {
      var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      imageProgress.current = progress;
    }, function (error) {
      console.log('error uploading image', error)
    }, function () {
      imageProgress.current = 100;
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        setDownloadUrl(downloadURL);
      })

    })

  }

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View>
          {
            updatingPhoto ? (
              <View style={[styles.profilePhoto, { backgroundColor: "#ddd", justifyContent: "center", alignItems: "center"}]}>
                <Text style={styles.updateProgress}>{imageProgress.current}%</Text>
              </View>
            ) : (
              <Image
                source={{ uri: profilePic }}
                style={styles.profilePhoto} />
            )
          }
          <Text style={styles.displayName}>{auth?.currentUser?.displayName}</Text>
          <TouchableWithoutFeedback onPress={choosePhoto}>
            <View style={styles.editProfilePic}>
              <AntDesign name="edit" size={24} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "lightblue"
  },
  displayName: {
    fontSize: 22,
    color: "#444",
    textAlign: 'center'
  },
  editProfilePic: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    right: 0
  },
  updateProgress: {
    fontSize: 22,
    color: "#777"
  }
})
