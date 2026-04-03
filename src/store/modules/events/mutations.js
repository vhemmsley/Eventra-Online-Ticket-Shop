export default {
  toggleFavorite(state, id) {
    const event = state.events.find((event) => event.id === id)
    if (event) {
      event.isFavourite = !event.isFavourite
    }
  },
}
