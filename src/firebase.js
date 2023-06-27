import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import{getFirestore, setDoc, doc, getDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1RiV9lVZZLzXVWm9YJ22lfsUzEWfluBA",
  authDomain: "finance-tracker-fc438.firebaseapp.com",
  projectId: "finance-tracker-fc438",
  storageBucket: "finance-tracker-fc438.appspot.com",
  messagingSenderId: "964003731216",
  appId: "1:964003731216:web:f144beeb39eff714a1b795"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc, getDoc};