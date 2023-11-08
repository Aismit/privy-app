import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCYnYgYIJnE6lIY3tPvf4EMoGoVcQklt8M",
    authDomain: "privy-db.firebaseapp.com",
    projectId: "privy-db",
    storageBucket: "privy-db.appspot.com",
    messagingSenderId: "679107821188",
    appId: "1:679107821188:web:368f35f4d3885119144cd1",
    measurementId: "G-21YV5TJYKP"
};


const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);

