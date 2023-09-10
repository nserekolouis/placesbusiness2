// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCJFhDhtFgKqwD6vEQV7kHvHhcspn7rdo8",
//   authDomain: "places-2afd8.firebaseapp.com",
//   databaseURL: "https://places-2afd8-default-rtdb.firebaseio.com",
//   projectId: "places-2afd8",
//   storageBucket: "places-2afd8.appspot.com",
//   messagingSenderId: "728367549349",
//   appId: "1:728367549349:web:fe223966882fef7d2f764c",
//   measurementId: "G-ZS0PZWZVHJ"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCJFhDhtFgKqwD6vEQV7kHvHhcspn7rdo8",
  authDomain: "places-2afd8.firebaseapp.com",
  databaseURL: "https://places-2afd8-default-rtdb.firebaseio.com",
  projectId: "places-2afd8",
  storageBucket: "places-2afd8.appspot.com",
  messagingSenderId: "728367549349",
  appId: "1:728367549349:web:32b484fa26bcd3152f764c",
  measurementId: "G-NTRRS3HCNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
//getAnalytics(app);
export default messaging