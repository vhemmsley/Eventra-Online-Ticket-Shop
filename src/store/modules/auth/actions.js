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
    try {
      const action = await createUserWithEmailAndPassword(auth, payload.email, payload.password)

      const user = action.user

      await setDoc(doc(db, 'users', user.uid), {
        email: payload.email,
        role: payload.role || 'attendee',
        // user details
        fullName: payload.fullName || payload.hostName || '',

        phone: payload.phoneNumber || '',
      })

      context.commit('setUser', {
        userId: user.uid,
        token: user.accessToken,
        role: payload.role || 'attendee',

        fullName: user.fullName || user.hostName || '',
        email: user.email,
        phone: user.phoneNumber || '',
      })
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email already exists. Try logging in instead.')
      }
      throw error
    }
  },
  // log in action

  async login(context, payload) {
    const action = await signInWithEmailAndPassword(auth, payload.email, payload.password)
    console.log('LOGIN STARTED', payload)

    const user = action.user
    console.log('USER FROM FIREBASE', user)
    const token = await user.getIdToken()

    const userDoc = await getDoc(
      doc(db, 'users', user.uid, user.fullName, user.email, user.phoneNumber),
    )

    const role = userDoc.exists() ? userDoc.data().role : 'attendee'

    const userData = {
      userId: user.uid,
      token,
      role,
      fullName,
      email,
      phoneNumber,
    }

    context.commit('setUser', userData)

    // ✅ ADD THIS
    localStorage.setItem('user', JSON.stringify(userData))
  },

  // google log in action

  async googleSignIn({ commit }) {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)

      const user = result.user
      const token = await user.getIdToken()

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

      const userData = {
        userId: user.uid,
        token,
        role,
      }
      commit('setUser', userData)
    } catch (error) {
      console.error(error)
      throw error
    }

    localStorage.setItem('user', JSON.stringify(userData))
  },

  // logout action
  logout(context) {
    context.commit('logout')
  },
}
