// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRzMfNZxflgXvU_F0zLy7bArvS5oafw9Q',
  authDomain: 'ecomapp-2b602.firebaseapp.com',
  projectId: 'ecomapp-2b602',
  storageBucket: 'ecomapp-2b602.appspot.com',
  messagingSenderId: '533378351752',
  appId: '1:533378351752:web:0f420170c10c587f3f953d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
