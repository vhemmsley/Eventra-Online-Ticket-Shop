import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  // fetches all events from  firebase and updates the state
  async fetchEvents({ commit }) {
    commit('setIsLoading', true)

    const q = query(collection(db, 'events'), where('eventStatus', '==', 'active'))

    const snapshot = await getDocs(q)

    const events = []
    snapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() })
    })

    commit('setEvent', events)
    commit('setIsLoading', false)
  },

  // fetches featured events for the home page
  async fetchFeaturedEvents({ commit }) {
    commit('setIsLoading', true)

    const q = query(
      collection(db, 'events'),
      where('featured', '==', true),
      where('eventStatus', '==', 'active'),
    )

    const snapshot = await getDocs(q)

    const featuredEvents = []

    snapshot.forEach((doc) => {
      featuredEvents.push({ id: doc.id, ...doc.data() })
    })
    console.log(featuredEvents)
    commit('setFeaturedEvents', featuredEvents)

    commit('setIsLoading', false)
  },

  // fetches all events for the hosts

  async fetchHostEvents({ commit, rootGetters }) {
    commit('setIsLoading', true)

    const userId = rootGetters['auth/userId']

    const q = query(collection(db, 'events'), where('hostId', '==', userId))

    const snapshot = await getDocs(q)

    const hostEvents = []
    snapshot.forEach((doc) => {
      hostEvents.push({ id: doc.id, ...doc.data() })
    })

    commit('setHostEvents', hostEvents)
    commit('setIsLoading', false)
  },
}
