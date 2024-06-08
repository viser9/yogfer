// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

// const firebaseConfig = {
//     apiKey: "AIzaSyDu8OSnOSEk6-hVdsGg8puP7sGlrCj6M4M",
//     authDomain: "ferrera-99389.firebaseapp.com",
//     projectId: "ferrera-99389",
//     storageBucket: "ferrera-99389.appspot.com",
//     messagingSenderId: "266395950332",
//     appId: "1:266395950332:web:63ee090c9a3e6f4d614b79",
//     measurementId: "G-Z7D0H4PXT4"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyBKVdgRvy8u-6UTqRkA7ISAakhG_uA6pkg",
  authDomain: "fr-ferreira-institute.firebaseapp.com",
  projectId: "fr-ferreira-institute",
  storageBucket: "fr-ferreira-institute.appspot.com",
  messagingSenderId: "986891593740",
  appId: "1:986891593740:web:dad2cded71aa54504ae629",
  measurementId: "G-5HCL3FE148"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);