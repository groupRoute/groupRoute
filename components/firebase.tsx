import firebase from "firebase";

function createNewGroup(destination, users) {
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

function updateUserLocation() {}

export { createNewGroup, updateUserLocation };
