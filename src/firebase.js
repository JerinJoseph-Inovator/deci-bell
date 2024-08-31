
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyACUQrd3YJaBSuQ9svcjEuTs4fS0vivths",
  authDomain: "decibell-76d3d.firebaseapp.com",
  projectId: "decibell-76d3d",
  storageBucket: "decibell-76d3d.appspot.com",
  messagingSenderId: "822343322662",
  appId: "1:822343322662:web:91ecf1e674c61c98f92ae7",
  measurementId: "G-LKK66102P4"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);


export { app, auth, storage };



// npm install -g firebase-tools
// firebase login