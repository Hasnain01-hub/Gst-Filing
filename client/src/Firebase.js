import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8PMMlHPMI7JJ6JqVUi_OvDAY_ECVAUXg",
  authDomain: "gst-filing-eeff2.firebaseapp.com",
  projectId: "gst-filing-eeff2",
  databaseURL: "gs://gst-filing-eeff2.appspot.com",
  storageBucket: "gst-filing-eeff2.appspot.com",
  messagingSenderId: "937928053252",
  appId: "1:937928053252:web:afaf72f43e240e56869b51",
  measurementId: "G-SJ4ET5C357",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore();
export const storage = getStorage(app);

export const logout1 = () => {
  auth.signOut();
};
