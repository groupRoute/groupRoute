import * as React from "react";
import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>groupRoute Map</Text>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* {this.state.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))} */}
      </MapView>
      {/* <MapView style={styles.map} /> */}
      <SafeAreaView
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/homeScreen.tsx" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
