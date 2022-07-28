//importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
//importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJFhDhtFgKqwD6vEQV7kHvHhcspn7rdo8",
  authDomain: "places-2afd8.firebaseapp.com",
  databaseURL: "https://places-2afd8-default-rtdb.firebaseio.com",
  projectId: "places-2afd8",
  storageBucket: "places-2afd8.appspot.com",
  messagingSenderId: "728367549349",
  appId: "1:728367549349:web:fe223966882fef7d2f764c",
  measurementId: "G-ZS0PZWZVHJ"
};

//const app = firebase.initializeApp(firebaseConfig)
initializeApp(firebaseConfig);