import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Splash from "./Screens/Splash"; // splash with splash.gif
import CreateUser from "./Screens/CreateUser"; // new signup screen
import Auth from "./Screens/Auth"; // new signin screen
import Acceuil from "./Screens/Acceuil"; // home after login
import List from "./Screens/List"; // profiles list
import Chat from "./Screens/Chat"; // chat screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* Splash screen */}
        <Stack.Screen name="Splash" component={Splash} />

        {/* Authentication flow */}
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="CreateUser" component={CreateUser} />

        {/* Accueil après login */}
        <Stack.Screen name="acc" component={Acceuil} />

        {/* Liste des profils */}
        <Stack.Screen name="List" component={List} />

        {/* Chat */}
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: true, title: "Chat" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
