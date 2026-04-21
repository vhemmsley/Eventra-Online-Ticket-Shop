export default {
  toggleFavorite(state, id) {
    const event = state.events.find((event) => event.id === id)
    if (event) {
      event.isFavourite = !event.isFavourite
    }
  },

  setEvent(state, payload) {
    state.events = payload
  },

  setFeaturedEvents(state, payload) {
    state.featuredEvents = payload
  },

  setIsLoading(state, payload) {
    state.isLoading = payload
  },

  setHostEvents(state, payload) {
    state.hostEvents = payload || []
  },
}
