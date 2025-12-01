import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import profil from "../assets/profil.png";
import * as ImagePicker from 'expo-image-picker';
import firebase from "../config/index";
const database = firebase.database();
const profils = database.ref().child("Profils");



export default function Account(props) {

  

  const currentId = props.route.params.currentId;
  console.log("Account → currentId:", currentId);

  const [nom, setNom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [Image, setImage] = useState()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Image de profil */}
      <TouchableOpacity onPress={pickImage}>
        <Image source={Image?{uri:Image}:profil} style={styles.profileImage} />
      </TouchableOpacity>

      {/* Email (non modifiable) */}
      <TextInput
        placeholder="Email"
        value={email}
        editable={false}
        style={[styles.input, { backgroundColor: "#eee" }]}
      />

      {/* Nom */}
      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        placeholderTextColor="#888"
        style={styles.input}
      />

      {/* Pseudo */}
      <TextInput
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
        placeholderTextColor="#888"
        style={styles.input}
      />

      {/* Téléphone */}
      <TextInput
        placeholder="Téléphone"
        value={numero}
        onChangeText={setNumero}
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity
        onPress={() => {
          const key = profils.push().key;
          const ref_unprofil = profils.child(currentId);
          ref_unprofil.set({
            id: currentId,
            nom,
            pseudo,
            numero,
            email,
          });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B141A", 
    alignItems: "center",
    padding: 20,
    paddingTop:150,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#25D366",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1F2C34",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#EDEDED", 
    borderWidth: 1,
    borderColor: "#2E3A3F", 
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#25D366",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#0B141A", 
    fontSize: 18,
    fontWeight: "700",
  },
});