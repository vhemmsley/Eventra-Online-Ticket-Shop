// General IMPORTS
import { auth, db, googleAuthProvider } from '@/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

// SIGN UP IMPORTS
import { createUserWithEmailAndPassword } from 'firebase/auth'

// LOG IN IMPORTS
import { signInWithEmailAndPassword } from 'firebase/auth'

// GOOGLE AUTH IMPORTS
import { signInWithPopup } from 'firebase/auth'

export default {
  // sign up action

  async signup(context, payload) {
    const action = await createUserWithEmailAndPassword(auth, payload.email, payload.password)

    const user = action.user
    // save role to firebase
    // user gets an id , accessToken by default when created by auth

    await setDoc(doc(db, 'users', user.uid), { email: payload.email, role: payload.role }) //host or attendee\

    context.commit('setUser', { user: user.uid, token: user.accessToken, role: payload.role })
  },

  // log in action

  async login(context, payload) {
    const action = await signInWithEmailAndPassword(auth, payload.email, payload.password)

    const user = action.user

    // get role from firebase

    const userDoc = await getDoc(doc(db, 'users', user.uid))
    const role = userDoc.data().role

    context.commit('setUser', {
      user: user.uid,
      token: user.accessToken,
      role,
    })
  },

  // google log in action

  async googleSignIn({ commit }) {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)

      const user = result.user
      const userRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userRef)

      let role = 'attendee'

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          email: user.email,
          role: 'attendee',
          provider: 'google',
        })
      } else {
        role = userDoc.data().role
      }

      commit('setUser', {
        user: user.uid,
        token: user.accessToken,
        role,
        provider: 'google',
      })
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      throw error
    }
  },

  // logout action
  logout(context) {
    context.commit('logout')
  },
}
