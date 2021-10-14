
import  {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCIg78W3tQiGtvHlguc20bXMTxsNwuKMyo",
    authDomain: "usersapps-e4b92.firebaseapp.com",
    databaseURL: "https://usersapps-e4b92.firebaseio.com",
    projectId: "usersapps-e4b92",
    storageBucket: "usersapps-e4b92.appspot.com",
    messagingSenderId: "198829795798",
    appId: "1:198829795798:web:3f4959571ac8af29ed9c77",
    measurementId: "G-YSMH98W69P"
  };
  // Initialize Firebase
const app =initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;
