// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlSRkzY-9Xs0qWzagY0iUYAscZrX-jKZQ",
  authDomain: "bloinx-web.firebaseapp.com",
  databaseURL: "https://bloinx-web-default-rtdb.firebaseio.com",
  projectId: "bloinx-web",
  storageBucket: "bloinx-web.appspot.com",
  messagingSenderId: "391807023044",
  appId: "1:391807023044:web:ba5874d4caa9cc6b739691",
  measurementId: "G-K330M0JNQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db =getFirestore(app);
export default db;