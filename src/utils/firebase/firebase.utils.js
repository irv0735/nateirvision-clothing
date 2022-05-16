import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBanoqiNHQHOpl12oSG7YYl_tsjWUnrDxg",
  authDomain: "nateirvision-clothing-db.firebaseapp.com",
  projectId: "nateirvision-clothing-db",
  storageBucket: "nateirvision-clothing-db.appspot.com",
  messagingSenderId: "745379945177",
  appId: "1:745379945177:web:045b022d4b1fc83cc57cc8"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);