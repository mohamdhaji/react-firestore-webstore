import firebase from 'firebase';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPAJ1Z-djmqqltjFgVx7Hq5bcHoCMlxYo",
  authDomain: "store-app-2ec81.firebaseapp.com",
  projectId: "store-app-2ec81",
  storageBucket: "store-app-2ec81.appspot.com",
  messagingSenderId: "45865879269",
  appId: "1:45865879269:web:92c4908b840a0f8c4eb60c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore =firebase.firestore();

const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)

export default firebase;