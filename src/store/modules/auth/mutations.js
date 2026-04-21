export default {
  setUser(state, payload) {
    state.userId = payload.userId
    state.token = payload.token
    state.role = payload.role
  },

  logout(state) {
    state.userId = null
    state.token = null
    state.role = null
  },

  setAutoLogout(state) {
    state.didAutoLogout = true
  },
}
