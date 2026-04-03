export default {
  allCategories(state) {
    return state.categories
  },
  featuredEvents(state) {
    return state.events.filter((event) => event.featured)
  },
}
