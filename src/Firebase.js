import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider}  from "firebase/auth"
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCC8JMm6sjUwA3Bu7sOi1QJQ7Xv2t44rw",
  authDomain: "zelar-practise.firebaseapp.com",
  databaseURL: "https://zelar-practise-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zelar-practise",
  storageBucket: "zelar-practise.appspot.com",
  messagingSenderId: "903370382495",
  appId: "1:903370382495:web:d17bb3eadf1274475c16aa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)