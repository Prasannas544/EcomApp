// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASRkmk_snja4A24NZhvUy5j-XFHHZORdI",
  authDomain: "ecomapp-35baa.firebaseapp.com",
  projectId: "ecomapp-35baa",
  storageBucket: "ecomapp-35baa.appspot.com",
  messagingSenderId: "205337662018",
  appId: "1:205337662018:web:9af2b1b7459cdaf56253db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app