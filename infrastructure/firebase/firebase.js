// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3cMAdtRAGtHUoMVWlthDZyf__TMtjTkI",
  authDomain: "space-share-1364d.firebaseapp.com",
  projectId: "space-share-1364d",
  storageBucket: "space-share-1364d.appspot.com",
  messagingSenderId: "697263576801",
  appId: "1:697263576801:web:b65cf2d5b45a01f7a9c9a0",
  measurementId: "G-S173RCTPS6",
  databaseUrl: "https://space-share-1364d-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, auth, firestore, storage };
