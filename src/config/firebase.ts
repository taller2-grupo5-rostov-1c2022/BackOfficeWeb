import { initializeApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUcNPOx5UlHclHE27kfnu58EBFYw8HPj0",
  authDomain: "rostov-spotifiuby.firebaseapp.com",
  projectId: "rostov-spotifiuby",
  storageBucket: "rostov-spotifiuby.appspot.com",
  messagingSenderId: "186491690051",
  appId: "1:186491690051:web:3d463b3f3a893b5637c8f6",
  measurementId: "G-CZMDZN3KK5",
};

const firebase_app = initializeApp(firebaseConfig);

export default firebase_app;
