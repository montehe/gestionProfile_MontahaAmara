// Import the functions you need from the SDKs you need
import app from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/storage";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qiqspmogtfjubltybnvu.supabase.co";
const supabaseKey = "sb_publishable_6sHlJMRp09XcKmSrcKPOOQ_XQj-j7Tn";
const supabase = createClient(supabaseUrl, supabaseKey);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ0PKM620nDXhVjwvVfrKc4Okvjekan2Q",
  authDomain: "whatsapp-a4202.firebaseapp.com",
  databaseURL: "https://whatsapp-a4202-default-rtdb.firebaseio.com",
  projectId: "whatsapp-a4202",
  storageBucket: "whatsapp-a4202.firebasestorage.app",
  messagingSenderId: "439124249560",
  appId: "1:439124249560:web:e4c40adb8e0475a20d40ad",
  measurementId: "G-YL4CED1V59",
};


// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig)

export  {supabase};
export default firebase;

