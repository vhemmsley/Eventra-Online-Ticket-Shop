export default {
  userId(state) {
    return state.userId
  },

  isAuthenticated(state) {
    return !!state.userId
  },

  role(state) {
    return state.role
  },
}
