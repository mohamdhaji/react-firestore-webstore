import { createNewProduct } from "../components/util/helpers";
import cuid from "cuid";
import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "./asyncActions";

import { FETCH_PRODUCTS, CREATE_PRODUCT } from "./constants";

export const createProduct = (product) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch(asyncActionStart());

  try {
    const images = {};

    let mainImage = null;
    // Create a root reference
    const storageRef = firebase.storage().ref();

    for (let file of product.images) {
      const imageName = cuid();

      const path = `${product.collection}/${imageName}`;
      const ref = storageRef.child(path);

      const data = await ref.put(file);
      const downloadURL = await data.ref.getDownloadURL();

      if (!mainImage) {
        mainImage = downloadURL;
      }
      images[imageName] = downloadURL;
    }

    const newProduct = createNewProduct(product, images, mainImage);

    firestore
      .collection("products")
      .add(newProduct)
      .then(function (docRef) {
        toastr.success("Success", "product has been created");
        dispatch(asyncActionFinish());
      })
      .catch(function (error) {
        dispatch(asyncActionError());

        toastr.error("Oops", "Something went wrong");
      });
  } catch (error) {
    console.log(error);
  }
};

export const loadMore = (lastRef, filters) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  let lastDoc = "";
  const products = [];

  if (lastRef === "") return { lastRef: "lastDoc", disableLoadBtn: true };

  try {
    const collectionRef = firestore.collection("products");
    let query = collectionRef;
    let startAfter = await firestore.collection("products").doc(lastRef).get();

    if (filters.collection !== "All" && filters.collection !== "Best Sellers")
      query = query.where("collection", "==", filters.collection);
    if (filters.collection === "Best Sellers")
      query = query.where("bestSeller", "==", true);

    if (filters["model"].length > 0)
      query = query.where("modelName", "in", filters["model"]);
    if (filters["price"].length > 0) {
      query = query.where("price", ">=", filters["price"][0]);
      query = query.where("price", "<=", filters["price"][1]);
    }

    query = query.startAfter(startAfter).limit(8);

    const querySnap = await query.get();
    const length = querySnap.docs.length;
    if (length !== 0) lastDoc = querySnap.docs[length - 1].id;

    for (let i = 0; i < length; i++) {
      const product = {
        id: querySnap.docs[i].id,
        ...querySnap.docs[i].data(),
      };
      products.push(product);
    }

    dispatch({ type: FETCH_PRODUCTS, payload: { products } });

    return { lastRef: lastDoc, disableLoadBtn: length < 8 };
  } catch (error) {
    dispatch(asyncActionError());
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};

export const getProductsForShop = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  let lastRef = "";

  try {
    dispatch(asyncActionStart());

    const products = [];

    const collectionRef = firestore.collection("products");
    let query = collectionRef.limit(8);

    const querySnap = await query.get();
    const length = querySnap.docs.length;
    lastRef = querySnap.docs[length - 1].id;
    for (let i = 0; i < length; i++) {
      const product = {
        id: querySnap.docs[i].id,
        ...querySnap.docs[i].data(),
      };
      products.push(product);
    }

    dispatch({ type: FETCH_PRODUCTS, payload: { products } });
    dispatch(asyncActionFinish());

    return { lastRef, disableLoadBtn: length < 8 };
  } catch (error) {
    dispatch(asyncActionError());
    console.log(error);
    toastr.error("Oops", "Something went wrong");
  }
};

export const getProductsForHome = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();

  try {
    dispatch(asyncActionStart());
    const products = [];

    const collectionRef = firestore.collection("products");
    const query = collectionRef.where("bestSeller", "==", true).limit(8);
    const querySnap = await query.get();
    for (let i = 0; i < querySnap.docs.length; i++) {
      const product = {
        id: querySnap.docs[i].id,
        ...querySnap.docs[i].data(),
      };
      products.push(product);
    }

    dispatch({ type: FETCH_PRODUCTS, payload: { products } });
    dispatch(asyncActionFinish());
  } catch (error) {
    dispatch(asyncActionError());

    toastr.error("Oops", "Something went wrong");
  }
};

export const filterProducts = (filters) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  let lastRef = "";

  try {
    dispatch(asyncActionStart());

    const products = [];

    const collectionRef = firestore.collection("products");
    let query = collectionRef.limit(8);
    if (filters.collection !== "All" && filters.collection !== "Best Sellers")
      query = query.where("collection", "==", filters.collection);

    if (filters.collection === "Best Sellers")
      query = query.where("bestSeller", "==", true);

    if (filters["model"].length > 0)
      query = query.where("modelName", "in", filters["model"]);
    if (filters["price"].length > 0) {
      query = query.where("price", ">=", filters["price"][0]);
      query = query.where("price", "<=", filters["price"][1]);
    }
    const querySnap = await query.get();
    const length = querySnap.docs.length;
    if (length > 0) lastRef = querySnap.docs[length - 1].id;

    for (let i = 0; i < length; i++) {
      const product = {
        id: querySnap.docs[i].id,
        ...querySnap.docs[i].data(),
      };
      products.push(product);
    }

    dispatch({ type: FETCH_PRODUCTS, payload: { products } });
    dispatch(asyncActionFinish());
    return { lastRef, disableLoadBtn: length < 8 };
  } catch (error) {
    dispatch(asyncActionError());
    console.log(error);

    toastr.error("Oops", "Something went wrong");
  }
};
