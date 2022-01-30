import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
     apiKey: "AIzaSyDfIL9X9va2QdbSclpBGhPNTLuhMCmDRMg",
     authDomain: "react-99cc1.firebaseapp.com",
     projectId: "react-99cc1",
     storageBucket: "react-99cc1.appspot.com",
     messagingSenderId: "202397321009",
     appId: "1:202397321009:web:fa9451976ff4cd6f971210",
     measurementId: "G-86K9J95NEG"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
export default db;