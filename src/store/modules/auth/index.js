import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      role: null, // attendee or host
      token: null,
      didAutoLogout: false,
    }
  },
  actions,
  mutations,
  getters,
}
