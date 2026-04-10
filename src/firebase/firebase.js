// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDyeJiO_URdxVtrGs4GuUobSu1Hcl_3ue4',
  authDomain: 'eventra-844d8.firebaseapp.com',
  projectId: 'eventra-844d8',
  storageBucket: 'eventra-844d8.firebasestorage.app',
  messagingSenderId: '43182703187',
  appId: '1:43182703187:web:85221a5e8d78fd2dc0fca6',
  measurementId: 'G-RG1Z4Y3EK8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const auth = getAuth(app)
export { auth }
