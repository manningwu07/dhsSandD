// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config object from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAhL9SlURRY8-GWAIpUw-OG5d67IA4NHlc",
  authDomain: "high-school-club-websites.firebaseapp.com",
  projectId: "high-school-club-websites",
  storageBucket: "high-school-club-websites.appspot.com",
  messagingSenderId: "168079573394",
  appId: "1:168079573394:web:4095e2067ce624301c014b",
  measurementId: "G-C983T9TLYQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and set up Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
