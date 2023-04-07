import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAcAFY0fLbjAYJEHABHxrjb8-IRTYOuHL4",
    authDomain: "em25-c1a70.firebaseapp.com",
    databaseURL: "https://em25-c1a70-default-rtdb.firebaseio.com",
    projectId: "em25-c1a70",
    storageBucket: "em25-c1a70.appspot.com",
    messagingSenderId: "588520894878",
    appId: "1:588520894878:web:92fc7c999c151c7ceaa68f",
    measurementId: "G-ZV8Y51RPQP"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const REALTIME_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
