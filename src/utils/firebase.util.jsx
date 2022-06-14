// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4r88vRk2kugNBbQ6MbPlBCsx8Q9Y-Fl0',
  authDomain: 'clothing-2d666.firebaseapp.com',
  projectId: 'clothing-2d666',
  storageBucket: 'clothing-2d666.appspot.com',
  messagingSenderId: '481215764667',
  appId: '1:481215764667:web:34f8427a84dc25887b319e',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})
facebookProvider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)
export const signInWithFacebookPopup = () =>
  signInWithPopup(auth, facebookProvider)

export const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userDocRef
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return signInWithEmailAndPassword(auth, email, password)
}
export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)
