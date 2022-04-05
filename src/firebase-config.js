// Help connect to our database
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4RDpVh3cEEZmqr4ZuEKjCB4aXx7f0KvM",
  authDomain: "fdm-expense.firebaseapp.com",
  projectId: "fdm-expense",
  storageBucket: "fdm-expense.appspot.com",
  messagingSenderId: "183395537121",
  appId: "1:183395537121:web:b6397e1c6b752950db27a0",
  measurementId: "G-29ZMRMFETV",
};

const app = initializeApp(firebaseConfig);

export const resetPassword = () => {
  const auth = getAuth(app);
  sendPasswordResetEmail(auth, "fnwachukwu84@gmail.com")
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      //const errorCode = error.code;
      //const errorMessage = error.message;
      // ..
    });
};

export const auth = getAuth(app);
export const db = getFirestore(app);
