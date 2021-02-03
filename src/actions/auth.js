import { closeModal } from "../actions/modalActions";

export const register = (email, password) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    // create the user in firebase auth
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const displayName = email.split("@")[0];
    // update the auth profile
    await createdUser.user.updateProfile({
      displayName: displayName,
      email: email,
    });
    // create a new profile in firestore
    let newUser = {
      email: email,
      displayName: displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
      cart:0
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
  }
};

export const login = (email, password) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
  };
};

export const socialLogin = (selectedProvider) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup",
    });
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        email: user.profile.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
        cart:0
      });
    }
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
  }
};
