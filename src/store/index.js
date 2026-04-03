import { createStore } from 'vuex'
import authModule from './modules/auth/index.js'
import clientModule from './modules/client/index.js'
import eventsModule from './modules/events/index.js'

const store = createStore({
  modules: {
    auth: authModule,
    client: clientModule,
    events: eventsModule,
  },
})

export default store
