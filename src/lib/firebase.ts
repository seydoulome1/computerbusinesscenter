import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDqO7hqSujn0xQM3LQcXaw9maBALM8T3-Y",
  authDomain: "hasbandgesco.firebaseapp.com",
  projectId: "hasbandgesco",
  storageBucket: "hasbandgesco.firebasestorage.app",
  messagingSenderId: "721045638855",
  appId: "1:721045638855:web:8fd68fe7555a645c1c78e2",
  measurementId: "G-LWZ5WRMCMP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);