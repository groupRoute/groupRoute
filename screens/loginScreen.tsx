import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Text } from "../components/Themed";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebaseConfig from "../constants/firebaseConfig";
import firebase from "firebase";
import { useFonts, Lato_300Light } from "@expo-google-fonts/lato";
import { LinearGradient } from "expo-linear-gradient";

export default function loginScreen() {
  let [fontsLoaded] = useFonts({ Lato_300Light });

  const recaptchaVerifier = React.useRef(null);
  const telPrefix = "+44";
  const [verificationId, updateVerificationId] = React.useState("");
  const [stage, updateStage] = React.useState(0);
  const [number, updateNumberState] = React.useState("");
  const [numInputFontSize, updatenumInputFontSize] = React.useState(15);
  const [numInputTextAlign, updatenumInputTextAlign] = React.useState("center");
  const [telPrefixDisplayState, updateTelPrefixDisplayState] =
    React.useState("flex");
  const [inputText, updateInputText] = React.useState(
    "Enter your mobile number"
  );
  const [buttonText, updateButtonText] = React.useState(
    "Send verification code"
  );

  const checkNumber = (checkNumber: string) => {
    updateNumberState(checkNumber.replace(/[^0-9]/g, ""));
    if (stage == 0) {
      if (checkNumber != "") {
        updatenumInputFontSize(20);
      } else {
        updatenumInputFontSize(15);
      }
    }
  };

  const buttonPress = async () => {
    if (stage == 0) {
      try {
        var telNumber = telPrefix + number;
        console.log(telNumber);
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        updateVerificationId(
          await phoneProvider.verifyPhoneNumber(
            telNumber,
            recaptchaVerifier.current
          )
        );
        console.log(verificationId);
        updateStage(1);
        updateNumberState("");
        updateInputText("Enter verification code");
        updateButtonText("Sign Up");
        updateTelPrefixDisplayState("none");
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    } else if (stage == 1) {
      try {
        // console.log(verificationId);
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          number
        );
        const authResult = await firebase
          .auth()
          .signInWithCredential(credential);
        console.log(authResult);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <LinearGradient
        colors={["#3494E6", "#EC6EAD"]}
        style={{ height: "100%" }}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        <SafeAreaView style={styles.container}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            attemptInvisibleVerification={false}
          />
          <Text style={styles.title}>Sign up for groupRoute</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.telPrefix, { display: telPrefixDisplayState }]}
              value={telPrefix}
              editable={false}
            />
            <TextInput
              style={[styles.numInput, { fontSize: numInputFontSize }]}
              placeholder={inputText}
              onChangeText={(number) => checkNumber(number)}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              autoCompleteType="tel"
              value={number}
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={buttonPress}>
            <Text style={{ textAlign: "center", color: "white" }}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Lato_300Light",
    fontSize: 40,
    paddingBottom: 25,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "lightblue",
    height: "100%",
    padding: 20,
  },
  telPrefix: {
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 20,
    flex: 1,
    marginRight: 5,
    textAlign: "center",
    fontSize: 20,
    // display: "none"
  },
  numInput: {
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 20,
    flex: 4,
    height: 50,
    paddingLeft: 10,
  },
  verificationInput: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    marginVertical: 20,
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    padding: 5,
    height: 50,
    justifyContent: "center",
  },
});
