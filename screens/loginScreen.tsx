import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Component } from "react";
import { Text } from "../components/Themed";
import { useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebaseConfig from "../constants/firebaseConfig";
import firebase from "firebase";

export default function loginScreen() {
  const recaptchaVerifier = React.useRef(null);
  const telPrefix = "+44";
  const [number, updateNumberState] = useState("");
  const [verificationCode, updateVerificationCode] = useState("");
  const updateNumber = (number: string) => {
    updateNumberState(number.replace(/[^0-9]/g, ""));
  };

  const checkNumber = (checkNumber: string, updateFunc: Function) => {
    updateFunc(checkNumber.replace(/[^0-9]/g, ""));
  };

  let verificationId: string;

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={false}
      />
      <Text style={{ textAlign: "center" }}>Sign up for groupRoute</Text>
      <Text style={{ textAlign: "center" }}>Phone Number</Text>
      <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
        <TextInput
          style={styles.telPrefix}
          value={telPrefix}
          editable={false}
        />
        <TextInput
          style={styles.telInput}
          placeholder="Enter your mobile number"
          onChangeText={(number) => checkNumber(number, updateNumber)}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCompleteType="tel"
          value={number}
          maxLength={10}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            var telNumber = telPrefix + number;
            console.log(telNumber);
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            verificationId = await phoneProvider.verifyPhoneNumber(
              telNumber,
              recaptchaVerifier.current
            );
            console.log(verificationId);
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Sign Up</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.verificationInput}
        placeholder="Enter verification code"
        keyboardType="numeric"
        textContentType="oneTimeCode"
        autoCompleteType="off"
        onChangeText={(number) => checkNumber(number, updateVerificationCode)}
        value={verificationCode}
        maxLength={6}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            // console.log(verificationId);
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            const authResult = await firebase
              .auth()
              .signInWithCredential(credential);
            console.log(authResult);
          } catch (err) {
            console.log(`Error: ${err.message}`);
          }
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  telPrefix: {
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },
  telInput: {
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 10,
    flex: 10,
  },
  verificationInput: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  inputBox: {
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    padding: 5,
  },
});
