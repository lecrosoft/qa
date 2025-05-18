import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQKahg2mYpYINYlO5sOExQj7ByqFqHkHw",
  authDomain: "live-question-and-answer-87b48.firebaseapp.com",
  projectId: "live-question-and-answer-87b48",
  storageBucket: "live-question-and-answer-87b48.firebasestorage.app",
  messagingSenderId: "590666919475",
  appId: "1:590666919475:web:fc61617f31c4f42ba2bd46",
  measurementId: "G-1L114YKH7N",
  databaseURL:
    "https://live-question-and-answer-87b48-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
