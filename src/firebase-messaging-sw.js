importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");
//import { SelectAllRounded } from "@material-ui/icons";
import firebase from "./Custom/firebase";
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBjYX-Aru2FaPLZvNun5soT4A6c8v5Ig_Q",
    authDomain: "onepirate-629ed.firebaseapp.com",
    databaseURL: "https://onepirate-629ed-default-rtdb.firebaseio.com/",
    projectId: "onepirate-629ed",
    storageBucket: "onepirate-629ed.appspot.com",
    messagingSenderId: "797106594064",
    appId: "1:797106594064:web:8d7b28c214b69a799a0595"
  };

  
  //const app = 
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  const admin = require('firebase-admin');

  var serviceAccount = require('../public/onepirate-629ed-firebase-adminsdk-jcb91-400ff07e47.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  var message = { 
    notification: {

      title: "Reminder Notification", 
      body: "Hello... Message from Healthbe!"
    },
    token: 'de2dStBPyckf9QMRyxX6OL:APA91bGkh7Zlj8FEUMLKz_iUaUbKGLUbkrs-wLeiYBDllDhGYcRsNgjxpsNMAkMn5q0NBGDqdbSpsGx3jSQiAr8yLCdH7SWPj9d6SX2v9pgUd8CHAb5DOVwuT2LygDdOclF7gzIZ15Cu'

  }

  admin.messaging().send(message).then(res => {
    console.log('send success')
  }).catch(err => {
    console.log(err)
  })

  


  /*messaging.getToken({ vapidKey: 'BIA7EaF-xDzZGgPKnBWVzcvHNPhOPYWxdVcAGR4UhVzNtckAG5pj9NZEDCqifr_4pXrAgu0L5T7n0zIDFTZ-HTc' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

  function requestPermission() {
    // [START messaging_request_permission]
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve a registration token for use with FCM.
        // ...
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    // [END messaging_request_permission]
  }*/

  