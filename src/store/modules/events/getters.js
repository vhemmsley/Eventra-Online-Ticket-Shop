export default {
  allCategories(state) {
    return state.categories
  },

  featuredEvents: (state) => (category) => {
    let events = state.events.filter((event) => event.featured)

    if (category && category !== 'All') {
      events = events.filter((event) => event.category === category)
    }

    return events
  },
}
