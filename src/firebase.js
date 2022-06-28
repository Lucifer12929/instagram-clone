// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSxngaacTS15rxlr3-XrTTTngKyk4G6uk",
  authDomain: "instagram-clone-8ee57.firebaseapp.com",
  databaseURL: "https://instagram-clone-8ee57-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-8ee57",
  storageBucket: "instagram-clone-8ee57.appspot.com",
  messagingSenderId: "467015867462",
  appId: "1:467015867462:web:9e7280d63945ab693d7e47",
  measurementId: "G-D6EPHHLGLM"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db=app.firestore();
const auth=app.auth();
const storage=app.storage();

  export { db, auth, storage };