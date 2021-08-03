import * as React from "react";
import { Component , useState} from "react";
import { StyleSheet, Dimensions, SafeAreaView, Switch} from "react-native";
import { State } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { Value } from "react-native-reanimated";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

var toggleLock = false

export default function TabOneScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    toggleLock=!toggleLock;
    console.log(toggleLock);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>groupRoute Map</Text>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={toggleLock}
      />
      <SafeAreaView style={styles.underMap}>
       <Text>focus on your location</Text>
      <Switch
        trackColor={{ false: "red", true: "green" }}
        ios_backgroundColor="red"
        onValueChange={toggleSwitch}
        value={isEnabled}
      /> 
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "80%",
  },
  underMap:{
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
});
