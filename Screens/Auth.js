import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../config/index";
export default function Auth(props) {

  const auth = firebase.auth();
  const [email, setEmail] = useState("test@gmail.com");
  const [pwd, setPwd] = useState("123456");
  const refinput2 = useRef();
  return (
    <LinearGradient colors={["#0B141A", "#1F2C34"]} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          onChangeText={(text) => {
            setEmail(text);
          }}
          onSubmitEditing={() => {
            refinput2.current.focus();
          }}
          blurOnSubmit={false}
          placeholder="email"
          keyboardType="email-address"
          style={styles.input}
        ></TextInput>
        <TextInput
          ref={refinput2}
          onChangeText={(text) => {
            setPwd(text);
          }}
          placeholder="password"
          keyboardType="default"
          secureTextEntry={true}
          style={styles.input}
        ></TextInput>
        <TouchableOpacity
          onPress={(e) => {
            auth
              .signInWithEmailAndPassword(email, pwd)
              .then((userCredential) => {
                const currentId = userCredential.user.uid;
                props.navigation.navigate("acc", { currentId });
              })

              .catch((err) => {
                alert(err);
              });
          }}
        >
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.guest}>
          <Text style={styles.guestText}>GUEST LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("CreateUser")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "85%",
    padding: 30,
    backgroundColor: "#1F2C34",
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#25D366",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#0B141A",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#EDEDED",
    borderWidth: 1,
    borderColor: "#2E3A3F",
  },
  button: {
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: "#0B141A", fontSize: 16, fontWeight: "700" },
  guest: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "#2E3A3F",
  },
  guestText: { color: "#EDEDED", fontSize: 14, fontWeight: "600" },
  link: { marginTop: 20, color: "#128C7E", fontSize: 14, fontWeight: "500" },
});
