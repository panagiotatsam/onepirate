import firebase from "firebase";
import "firebase/messaging";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";

const firebaseConfig = {
  apiKey: "AIzaSyD_vsZvPA-kxqp7RuB-u6Zk_jo275KfYng",
  authDomain: "healthbe-1eca5.firebaseapp.com",
  databaseURL: "https://healthbe-1eca5-default-rtdb.firebaseio.com",
  projectId: "healthbe-1eca5",
  storageBucket: "healthbe-1eca5.appspot.com",
  messagingSenderId: "893905529769",
  appId: "1:893905529769:web:0063c835b0a055617c72b8",
  measurementId: "G-MNJ4L3DPB1",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const messaging = firebase.messaging();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  firstName,
  lastName,
  phone,
  email,
  password
) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      firstName,
      lastName,
      phone,
      //authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};

export default firebase;
