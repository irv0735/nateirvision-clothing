import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
 } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBanoqiNHQHOpl12oSG7YYl_tsjWUnrDxg",
  authDomain: "nateirvision-clothing-db.firebaseapp.com",
  projectId: "nateirvision-clothing-db",
  storageBucket: "nateirvision-clothing-db.appspot.com",
  messagingSenderId: "745379945177",
  appId: "1:745379945177:web:045b022d4b1fc83cc57cc8"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt, 
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}
