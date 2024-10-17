// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzpWIwPURsW0fK7BQjfMsDB4T2p9YMn_I",
    authDomain: "collenwebapp.firebaseapp.com",
    projectId: "collenwebapp",
    storageBucket: "collenwebapp.appspot.com",
    messagingSenderId: "321856499903",
    appId: "1:321856499903:web:5eba7fbba7a1d34aabd60a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };