import "./App.css";
import Routes from "./routes";
import { Provider } from "react-redux";
import { configureStore, rrfConfig } from "./store";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import firebase from "./firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import SimpleReactLightbox from "simple-react-lightbox";

const store = configureStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <SimpleReactLightbox>
            <Routes />
          </SimpleReactLightbox>

          <ReduxToastr
            position="bottom-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
