// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_KEY,
//     authDomain: "mern-blog-c1c24.firebaseapp.com",
//     projectId: "mern-blog-c1c24",
//     storageBucket: "mern-blog-c1c24.appspot.com",
//     messagingSenderId: "445369683164",
//     appId: "1:445369683164:web:b07c4c25a2f32195d63819"
// };

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "mernblogapp-qx02.onrender.com",
    databaseURL: "mern-blog-c1c24.appspot.com",
    storageBucket: "mern-blog-c1c24.appspot.com",
    projectId: "mern-blog-c1c24",
    appId: "1:445369683164:web:b07c4c25a2f32195d63819"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);