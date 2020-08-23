import firebase from 'firebase/app';
// import firebase from './index';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


//HAMZA ka firebase
const config = {
  apiKey: "AIzaSyC9st1z2oNqf31WlF3itTI3um2n20t9Syc",
  authDomain: "portfolio-discovery.firebaseapp.com",
  databaseURL: "https://portfolio-discovery.firebaseio.com",
  projectId: "portfolio-discovery",
  storageBucket: "portfolio-discovery.appspot.com",
  messagingSenderId: "941215942655",
  appId: "1:941215942655:web:bea1e10c287c98d73a09ca"
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
export { db, auth };
export default firebase;