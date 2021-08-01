import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>groupRoute Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.5269,
          longitude: -0.1263,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/homeScreen.tsx" />
    </View>
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
