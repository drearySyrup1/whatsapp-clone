// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB5FvDcWfEd87KIyRJ4nevlsu7dWJh0A4",
  authDomain: "whatsapp-1fe96.firebaseapp.com",
  projectId: "whatsapp-1fe96",
  storageBucket: "whatsapp-1fe96.appspot.com",
  messagingSenderId: "777458180761",
  appId: "1:777458180761:web:375aec6e7d42a7ba258e08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
