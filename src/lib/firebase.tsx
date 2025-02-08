import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmRc9DDzMmNh_YT5PmQd3X6A_mJZG7WXA",
    authDomain: "personal-projects-69.firebaseapp.com",
    databaseURL: "https://personal-projects-69-default-rtdb.firebaseio.com",
    projectId: "personal-projects-69",
    storageBucket: "personal-projects-69.firebasestorage.app",
    messagingSenderId: "800698599496",
    appId: "1:800698599496:web:9e0f1f4cac1c0b1584307d"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
