import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import List from "./List";
import Account from "./Account";
import Groupe from "./Groupe";

export default function Acceuil(props) {
  const Tab = createMaterialBottomTabNavigator();

  const currentId = props.route.params?.currentId;
  return (
    <Tab.Navigator
      initialRouteName="list"
      activeColor="#25D366"
      inactiveColor="#8898AA"
      barStyle={{
        backgroundColor: "#0B141A",
        borderTopColor: "#2E3A3F",
        borderTopWidth: 1,
      }}
      shifting={true}
    >
      <Tab.Screen
        name="list"
        component={List}
        initialParams={{ currentId }} 
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="groupe"
        component={Groupe}
        initialParams={{ currentId }} // ⭐ PASS currentId
        options={{
          tabBarLabel: "Groups",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="account"
        component={Account}
        initialParams={{ currentId }} // ⭐ PASS currentId
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
