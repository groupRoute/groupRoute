import firebase from "firebase";

function loginUser() {
  firebase
    .auth()
    .signInWithEmailAndPassword(
      "samuel.mashil@yahoo.co.uk",
      "randompassword"
    )
    .then((res) => {
      // console.log(res);
    });
  // console.log(firebase.auth().currentUser);
}

function createNewGroup(lat, long, users) {
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
