import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  // ================= ALL EVENTS =================
  async fetchEvents({ commit }) {
    commit('setIsLoading', true)

    const q = query(collection(db, 'events')) // no filtering

    const snapshot = await getDocs(q)

    const events = []

    snapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() })
    })

    commit('setEvent', events)
    commit('setIsLoading', false)
  },

  // ================= FEATURED EVENTS =================
  async fetchFeaturedEvents({ commit }) {
    commit('setIsLoading', true)

    const q = query(collection(db, 'events'), where('featured', '==', true))

    const snapshot = await getDocs(q)

    const featuredEvents = []

    snapshot.forEach((doc) => {
      featuredEvents.push({ id: doc.id, ...doc.data() })
    })

    commit('setFeaturedEvents', featuredEvents)
    commit('setIsLoading', false)
  },

  // ================= HOST EVENTS =================
  async fetchHostEvents({ commit, rootGetters }) {
    commit('setIsLoading', true)

    const userId = rootGetters['auth/userId']

    if (!userId) {
      commit('setIsLoading', false)
      return
    }

    const q = query(collection(db, 'events'), where('hostId', '==', userId))

    const snapshot = await getDocs(q)

    const hostEvents = []

    snapshot.forEach((doc) => {
      hostEvents.push({ id: doc.id, ...doc.data() })
    })

    commit('setHostEvents', hostEvents)
    commit('setIsLoading', false)
  },

  // ================= DELETE EVENT =================
  async deleteEvent({ dispatch }, id) {
    try {
      await deleteDoc(doc(db, 'events', id))
      dispatch('fetchHostEvents')
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  },
}
