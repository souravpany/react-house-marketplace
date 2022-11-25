import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr_zOXdQsDI23pWxawfsLjgHBAf7xb1EM",
    authDomain: "house-marketplace-app-ea6c2.firebaseapp.com",
    projectId: "house-marketplace-app-ea6c2",
    storageBucket: "house-marketplace-app-ea6c2.appspot.com",
    messagingSenderId: "273611349687",
    appId: "1:273611349687:web:4a0962f76ef46147e33732"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);