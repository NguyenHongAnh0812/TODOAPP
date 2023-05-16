// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // otp 1 ( hết)

  // apiKey: "AIzaSyDm6hfaHMa_RZ1wNvA3_hVWLBAhffVgymc",
  // authDomain: "otp-todoapp.firebaseapp.com",
  // projectId: "otp-todoapp",
  // storageBucket: "otp-todoapp.appspot.com",
  // messagingSenderId: "447298055917",
  // appId: "1:447298055917:web:6c81f6cc967794f60c66e4",
  // measurementId: "G-JPSH9TM8MJ"

  // otp-1 ( 3 lần sử dụng rồi)

  // apiKey: "AIzaSyCUrJtbull2k79arYdxkfOmQ5UxjX3I3NQ",
  // authDomain: "otp-project-1.firebaseapp.com",
  // projectId: "otp-project-1",
  // storageBucket: "otp-project-1.appspot.com",
  // messagingSenderId: "354205126513",
  // appId: "1:354205126513:web:3b476d2d140a14926170d0",
  // measurementId: "G-DRY5XN540T"

  // otp-2 ( 1 lần sử dụng)
  // apiKey: "AIzaSyAlUdnAouDQ16IA9VVJRVIVtkVI4UM3c04",
  // authDomain: "otp-project-2-3c8f3.firebaseapp.com",
  // projectId: "otp-project-2-3c8f3",
  // storageBucket: "otp-project-2-3c8f3.appspot.com",
  // messagingSenderId: "451270103892",
  // appId: "1:451270103892:web:7bedd29b30ca219920eec1",
  // measurementId: "G-TW8YVRME94"

  // otp-3
  apiKey: "AIzaSyDfKpBbvn1CWXOejVCqxiP0GhZQMkvSmvQ",
  authDomain: "otp-project-3.firebaseapp.com",
  projectId: "otp-project-3",
  storageBucket: "otp-project-3.appspot.com",
  messagingSenderId: "152430198651",
  appId: "1:152430198651:web:49fb08b58f747c2b8b47de",
  measurementId: "G-C2VXCEQJH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);