import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import modalsReducer from "./modalReducer";
import asyncReducer from "./asyncReducer";
import productsReducer from "./productsReducer";
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  toastr: toastrReducer,
  modals: modalsReducer,
  async: asyncReducer,
  products: productsReducer,
});

export default rootReducer;
