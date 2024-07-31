// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1tmoQa9Ow_EIjPGmB29lvetQlMvAdtnE",
  authDomain: "inventory-management-26f5c.firebaseapp.com",
  projectId: "inventory-management-26f5c",
  storageBucket: "inventory-management-26f5c.appspot.com",
  messagingSenderId: "148758747762",
  appId: "1:148758747762:web:c33151de5da899585740eb",
  measurementId: "G-3813P4JCTJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { firestore };
