export default {
  setUser(state, payload) {
    state.user = payload.user
    state.role = payload.role
    state.token = payload.token
  },

  logout(state, payload) {
    state.user = null
    state.role = null
    state.token = null
  },

  setAutoLogout(state) {
    state.didAutoLogout = true
  },
}
