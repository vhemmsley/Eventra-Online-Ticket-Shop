// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCZfgAyItxawS3FzjsjZDzJ-CKqDbWFCX4',
  authDomain: 'eventra-5b375.firebaseapp.com',
  projectId: 'eventra-5b375',
  storageBucket: 'eventra-5b375.firebasestorage.app',
  messagingSenderId: '53804447008',
  appId: '1:53804447008:web:1576624a1a5cd1d2a85345',
  measurementId: 'G-XGJJZ3ZFYY',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// ✅ THESE MUST BE EXPORTED
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleAuthProvider = new GoogleAuthProvider()
