import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";

export default function Groupe(props) {
  const currentId = props.route.params?.currentId;

  return (
    <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
    

      <Text>Groupe</Text>
    </View>
  )
}