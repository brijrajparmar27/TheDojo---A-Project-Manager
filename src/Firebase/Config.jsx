import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "thedojo-cbb08.firebaseapp.com",
  projectId: "thedojo-cbb08",
  storageBucket: "thedojo-cbb08.appspot.com",
  messagingSenderId: "153604337778",
  appId: "1:153604337778:web:aac8af0fce9bcf1b12d2eb"
};

initializeApp(firebaseConfig);

export const firestore = getFirestore();
export const auth = getAuth();