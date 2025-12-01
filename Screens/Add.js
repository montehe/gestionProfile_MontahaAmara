import React, { useState } from "react";
import firebase from "../config/index";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import profil from "../assets/profil.png"
export default function Add() {
  const database = firebase.database();
  const [image ,setImage] = useState (null);
  const [nom , setNom] = useState("test");
  const [prenom , setPrenom] = useState("test")
  const [numero , setNumero ] = useState("12345678")
  return (
    <View style={styles.container}>
              <StatusBar style="auto" />
        
              <View
                style={{ height: 30, width: "100%", backgroundColor: "#7c1010ff" }}
              />
      {/* Image de profil */}
      <Image
        source={profil}
        style={styles.profileImage}
      />

      {/* Input Nom */}
      <TextInput
        placeholder="Nom"
        placeholderTextColor="#888"
        style={styles.input}
      />

      {/* Input Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Input Téléphone */}
      <TextInput
        placeholder="Téléphone"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Bouton Save */}
      <TouchableOpacity 
      onPress={() => {
        const ref_base =database.ref();
        const ref_profils=ref_base.child("profils");
        const key= ref_profils.push().key;
        const ref_p =ref_profils.child("profil" + key);
        ref_p.set({
          nom:nom,
          prenom:prenom,
          numero:numero,
          id:key
        })
        .then(() =>
        {alert ("inserted");

        })
        .catch(() => 
        {alert("erreur") ;

        });
      }}
        
      style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#7c1010",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#7c1010",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
