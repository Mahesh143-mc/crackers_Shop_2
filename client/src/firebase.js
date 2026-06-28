import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYgVR8mr6pfToS2ytFuUrigcrtPTuSYW4",
  authDomain: "client-working-crackers.firebaseapp.com",
  projectId: "client-working-crackers",
  storageBucket: "client-working-crackers.firebasestorage.app",
  messagingSenderId: "806746748368",
  appId: "1:806746748368:web:fbd9893fecf6be2fc875d5",
  measurementId: "G-3YZKZHKR2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
