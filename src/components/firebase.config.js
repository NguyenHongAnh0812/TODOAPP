// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm6hfaHMa_RZ1wNvA3_hVWLBAhffVgymc",
  authDomain: "otp-todoapp.firebaseapp.com",
  projectId: "otp-todoapp",
  storageBucket: "otp-todoapp.appspot.com",
  messagingSenderId: "447298055917",
  appId: "1:447298055917:web:6c81f6cc967794f60c66e4",
  measurementId: "G-JPSH9TM8MJ"
  // apiKey: "AIzaSyCUrJtbull2k79arYdxkfOmQ5UxjX3I3NQ",
  // authDomain: "otp-project-1.firebaseapp.com",
  // projectId: "otp-project-1",
  // storageBucket: "otp-project-1.appspot.com",
  // messagingSenderId: "354205126513",
  // appId: "1:354205126513:web:3b476d2d140a14926170d0",
  // measurementId: "G-DRY5XN540T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);