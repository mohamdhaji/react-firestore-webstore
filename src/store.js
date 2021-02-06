import { createStore, applyMiddleware } from "redux";
import {  getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import firebase from "./firebase";
import { compose } from "redux";

export const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

export const configureStore = (preloadedState) => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];


  const composee=process.env.NODE_ENV === "development"
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose

  const composedEnhancer = composee (
    ...storeEnhancers,
    // reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        const newRootReducer = require("./reducers").default;
        store.replaceReducer(newRootReducer);
      });
    }
  }

  return store;
};
