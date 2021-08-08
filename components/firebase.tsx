import firebase from "firebase";

function loginUser() {
  firebase
    .auth()
    .signInWithEmailAndPassword("samuel.mashil@yahoo.co.uk", "randompassword") // I'll add the proper login function stuff at some point so ignore the random email and password thats there for now - Sam :)
    .then((res) => {
      // console.log(res);
    });
  // console.log(firebase.auth().currentUser);
}

function createNewGroup(lat: Number, long: Number, users: String[]) {
  firebase
    .database()
    .ref("groups/")
    .push()
    .then((ref) => {
      firebase
        .database()
        .ref("groups/" + ref.key)
        .set({
          test: "hi",
        });
      return ref.key;
    });
}

// WORK IN PROGRESS :)
// function updateUserLocation() {
//   firebase.database().ref("users/");
// }

export { loginUser, createNewGroup };
