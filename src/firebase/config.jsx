import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database' 

const firebaseConfig = {
  apiKey: "AIzaSyC6l5mKv37DbDTB6cbBoWreHth9ADbQU8Y",
  authDomain: "olx-clone-22d7b.firebaseapp.com",
  projectId: "olx-clone-22d7b",
  storageBucket: "olx-clone-22d7b.appspot.com",
  messagingSenderId: "190142070724",
  appId: "1:190142070724:web:7f6047deeda1159ba36e91",
  measurementId: "G-GMQCQL1630"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();

export default app;