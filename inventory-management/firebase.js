import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
const firestore = getFirestore(app);

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(app);
}

export { firestore, analytics };
