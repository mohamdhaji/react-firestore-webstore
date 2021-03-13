import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "./asyncActions";
import { UPDATE_PRODUCT } from "./constants";

import { toastr } from "react-redux-toastr";

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    dispatch(asyncActionStart());
    const storageRef = firebase.storage().ref();

    const path = `users/${user.uid}`;
    const ref = storageRef.child(path);

    const data = await ref.put(file);
    const downloadURL = await data.ref.getDownloadURL();

    // get the userdoc from firestore
    const userDoc = firestore.collection("users").doc(user.uid);

    userDoc
      .update({
        photoURL: downloadURL,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    await firebase.updateProfile({
      photoURL: downloadURL,
    });
    await user.updateProfile({
      photoURL: downloadURL,
    });

    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem uploading photo");
  }
};

export const updateUserInfo = ({ firstName, lastName, phone, email }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const displayName = firstName + " " + lastName;

  try {
    // get the userdoc from firestore
    const userDoc = firestore.collection("users").doc(user.uid);

    userDoc
      .update({
        displayName: displayName,
        phone: phone,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

    await firebase.updateProfile({
      email: email,
      displayName: displayName,
    });
    await user.updateProfile({
      displayName: displayName,
    });
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem uploading photo");
  }
};

export const addToCart = (props) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const uid = getState().firebase.auth.uid;
  const cartItemsNumber = getState().firebase.profile.cart;
  const productId = props.product.id;
  const price = props.product.price;
  const productQuantity = props.product.quantity;
  const firestore = getFirestore();
  const firebase = getFirebase();

  const enteredQuantity = props.quantity;
  if(uid !== undefined)
  if (productQuantity > 0 && enteredQuantity > 0) {
    dispatch(asyncActionStart());
    const collectionRef = firestore.collection("products").doc(productId);

    return collectionRef
      .update({
        quantity: productQuantity - parseInt(enteredQuantity),
      })
      .then(async () => {
        await firebase.updateProfile({
          cart: cartItemsNumber + parseInt(enteredQuantity),
        });
        const querySnap = await firestore
          .collection("users")
          .doc(uid)
          .collection("cart")
          .doc(productId)
          .get();
        const data = querySnap.data();
        if (data === undefined) {
          firestore
            .collection("users")
            .doc(uid)
            .collection("cart")
            .doc(productId)
            .set({
              quantity: parseInt(enteredQuantity),
              total: parseInt(enteredQuantity) * price,
            });
        } else {
          firestore
            .collection("users")
            .doc(uid)
            .collection("cart")
            .doc(productId)
            .set({
              quantity: data.quantity + parseInt(enteredQuantity),
              total: parseInt(enteredQuantity) * price + data.total,
            });
        }
        toastr.success("Success", `product has been added to cart`);
        if (props.dispatchProducts) {
          const products = [...getState().products];
          const product = products.find((p) => p.id === productId);
          product.quantity = productQuantity - parseInt(enteredQuantity);
          dispatch({ type: UPDATE_PRODUCT, payload: { product } });
        }
        dispatch(asyncActionFinish());
        return productQuantity - parseInt(enteredQuantity);
      })

      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
};

export const addOne = (
  productId,
  productQuantity,
  userProductQuantity,
  total,
  price,
  dispatchProducts = false
) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const uid = getState().firebase.auth.uid;
  const userCart = getState().firebase.profile.cart;

  if (uid && productQuantity > 0 ) {
    const collectionRef = firestore.collection("products").doc(productId);
    return collectionRef
      .update({
        quantity: productQuantity - 1,
      })
      .then(async () => {
        await firebase.updateProfile({
          cart: userCart + 1,
        });

        firestore
          .collection("users")
          .doc(uid)
          .collection("cart")
          .doc(productId)
          .set({
            quantity: userProductQuantity + 1,
            total: total + price,
          });
        if (dispatchProducts) {
          const products = [...getState().products];
          const product = products.find((p) => p.id === productId);
          product.quantity = productQuantity - 1;
          dispatch({ type: UPDATE_PRODUCT, payload: { product } });
        }

        return true;
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
};

export const remove = (
  productId,
  productQuantity,
  userProductQuantity,
  dispatchProducts = false
) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const uid = getState().firebase.auth.uid;
  const userCart = getState().firebase.profile.cart;
  console.log(dispatchProducts);
  const collectionRef = firestore.collection("products").doc(productId);
  collectionRef
    .update({
      quantity: productQuantity + userProductQuantity,
      available: true,
    })
    .then(async () => {
      await firebase.updateProfile({
        cart: userCart - parseInt(userProductQuantity, 10),
      });

      firestore
        .collection("users")
        .doc(uid)
        .collection("cart")
        .doc(productId)
        .delete()
        .then(function () {})
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
      if (dispatchProducts) {
        const products = [...getState().products];
        const product = products.find((p) => p.id === productId);
        product.quantity = productQuantity + userProductQuantity;
        dispatch({ type: UPDATE_PRODUCT, payload: { product } });
      }
    })

    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};

export const removeOne = (
  productId,
  productQuantity,
  userProductQuantity,
  total,
  price,
  dispatchProducts = false
) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const uid = getState().firebase.auth.uid;
  const userCart = getState().firebase.profile.cart;

  if (uid && userProductQuantity > 0) {
    const collectionRef = firestore.collection("products").doc(productId);

    collectionRef
      .update({
        quantity: productQuantity + 1,
      })
      .then(async () => {
        await firebase.updateProfile({
          cart: userCart - 1,
        });

        if (userProductQuantity === 1) {
          firestore
            .collection("users")
            .doc(uid)
            .collection("cart")
            .doc(productId)
            .delete()
            .then(function () {})
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        } else {
          firestore
            .collection("users")
            .doc(uid)
            .collection("cart")
            .doc(productId)
            .set({
              quantity: userProductQuantity - 1,
              total: total - price,
            });
        }
        if (dispatchProducts) {
          const products = [...getState().products];
          const product = products.find((p) => p.id === productId);
          product.quantity = productQuantity + 1;
          dispatch({ type: UPDATE_PRODUCT, payload: { product } });
        }
      })

      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
};
