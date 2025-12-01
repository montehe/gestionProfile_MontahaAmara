import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import firebase from "../config";
const database = firebase.database();
const ref_all_chat =database.ref("ALL_CHATS");

export default function Chat({ route }) {
  
  const { currentId, secondId, user } = route.params;
  console.log("List → currentId:", currentId);
  console.log("List → secondId:", secondId);

  const chatId =
    currentId > secondId ? currentId + secondId : secondId + currentId;

  const ref_chat = ref_all_chat.child(chatId);
  const ref_discussion = ref_chat.child("discussion");
  const ref_secondistyping = ref_chat.child(secondId + "istyping")
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [istyping, setIstyping]= useState(false)

  useEffect(() => {
    ref_discussion.on("value", (snapshot) => {
      let all = [];
      snapshot.forEach((msg) => {
        all.push(msg.val());
      });
      setMessages(all);
    });
    ref_secondistyping.on("Value" , (snapchat) => {setIstyping(snapchat.val())})

    return () => {
      ref_discussion.off();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    const key = ref_discussion.push().key;

    ref_discussion.child(key).set({
      idmsg: key,
      sender: currentId,
      receiver: secondId,
      time: new Date().toLocaleString(),
      message: input,
    });

    setInput("");
   

  };

  return (
    <ImageBackground
      source={require("../assets/bg_chat.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="light" />

      <Text style={styles.header}>Chat with {user ? user.nom : "Unknown"}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.idmsg}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === currentId
                ? styles.myMessage
                : styles.theirMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />
{istyping && <Text>istyping</Text>}
      <View style={styles.inputRow}>
        <TextInput
        onFocus={() => 
        {
          const ref_currentistyping = ref_chat.child(currentId + "istyping");
          ref_currentistyping.set(true);
        }
        }
        onBlur={() => 
        {
        const ref_currentistyping = ref_chat.child(currentId + "istyping");
         ref_currentistyping.set(false);
        }
        }
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message ....."
          placeholderTextColor="#8898AA"
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
    color: "#25D366",
    textAlign: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(31,44,52,0.8)", 
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "70%",
  },
  myMessage: {
    backgroundColor: "#25D366",
    alignSelf: "flex-end",
  },
  theirMessage: {
    backgroundColor: "#1F2C34",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#EDEDED",
    fontSize: 16,
    
  },
  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#2E3A3F",
    backgroundColor: "rgba(31,44,52,0.9)", // ✅ semi-transparent input bar
marginBottom:40
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#0B141A",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#EDEDED",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#25D366",
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sendText: {
    color: "#0B141A",
    fontWeight: "700",
  },
});
