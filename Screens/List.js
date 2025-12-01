import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // ✅ import des icônes vectorielles
import firebase from "../config";

const database = firebase.database();
const profils = database.ref().child("Profils");

export default function List(props) {
  const currentId = props.route.params.currentId;
  console.log("List → currentId:", currentId);

  const [data, setdata] = useState([]);

  useEffect(() => {
    profils.on("value", (snapshot) => {
      var d = [];
      snapshot.forEach((un_profil) => {
        d.push(un_profil.val());
      });
      setdata(d);
    });

    return () => {
      profils.off();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>Accueil</Text>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              style={styles.profileImage}
              source={require("../assets/profil.png")}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.nom}</Text>
              <Text style={styles.phone}>{item.numero}</Text>
            </View>
            <View style={styles.iconsRow}>
              {/* ✅ Icône téléphone */}
              <TouchableHighlight
                onPress={() => console.log("Appel", item.numero)}
              >
                <MaterialCommunityIcons
                  name="phone"
                  size={28}
                  color="#25D366"
                />
              </TouchableHighlight>

              {/* ✅ Icône chat */}
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("Chat", {currentId,secondId : item.id, user: item })
                }
              >
                <MaterialCommunityIcons
                  name="message-text"
                  size={28}
                  color="#25D366"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.layout}>
        <TouchableHighlight style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B141A",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: "#25D366",
    fontWeight: "700",
    textAlign: "center",
  },
  list: {
    paddingBottom: 100,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2C34",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#EDEDED",
  },
  phone: {
    fontSize: 14,
    color: "#8898AA",
  },
  iconsRow: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 15,
  },
  layout: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#25D366",
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B141A",
  },
});
