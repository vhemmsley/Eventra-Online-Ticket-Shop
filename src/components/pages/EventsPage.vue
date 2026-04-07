<template>
  <!-- section header -->
  <section class="container mx-auto bg-secondary-gradient p-6">
    <h1 class="text-5xl text-gradient text-center justify-center items-center">Explore Events</h1>
    <p class="max-w-lg px-6 mx-auto text-center text-sm text-slate-500 mt-2">
      Discover and attend amazing events near you
    </p>
  </section>

  <!-- FILTER + SEARCH -->
  <section class="section-container mt-10">
    <div
      class="flex flex-col mx-auto md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-10 justify-center items-center"
    >
      <!-- search bar-->
      <div>
        <input
          type="text"
          class="border-2 shadow-lg text-sm rounded-lg p-3 md:p-2 w-80 md:w-60 placeholder:text-md hover:border-purple-400 outline-purple-500"
          placeholder="Search Events..."
          v-model="searchQuery"
        />
      </div>

      <!-- event filter -->
      <div>
        <event-filter v-model:selectedCategory="selectedCategory"></event-filter>
      </div>

      <!-- location filter -->
      <div>
        <select
          v-model="selectedLocation"
          class="border-2 shadow-lg text-sm rounded-lg p-3 md:p-2 w-80 md:w-60 placeholder:text-md hover:border-purple-400 outline-purple-500"
        >
          <option value="All">🌍 All Locations</option>
          <option v-for="location in locations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>

      <!-- feedback and reset -->
      <div
        class="flex flex-row md:flex-col space-x-5 md:space-x-0 space-y-2 justify-center items-center mx-auto"
      >
        <p>Showing {{ filteredEvents.length }} Results</p>

        <button
          @click="resetFilters"
          class="px-3 md:px-2 md:py-2 py-2 rounded-lg items-center justify-center text-white bg-primary-gradient hover:scale-105 transition duration-200 shadow-md hover:shadow-xl"
        >
          Reset
        </button>
      </div>
    </div>
  </section>

  <!-- event cards -->
  <div class="section-container mt-14 mb-10">
    <!-- skeleton loader -->
    <div v-if="isLoading" class="flex mx-auto justify-center items-center">
      <base-spinner></base-spinner>
    </div>

    <!-- no event available -->
    <div v-else-if="filteredEvents.length === 0" class="mx-auto text-center py-10">
      <div class="text-4xl">🎭</div>
      <p class="text-lg font-semibold mt-4">No events found 😞</p>
      <p class="text-sm text-slate-400 mt-2">Try selecting a different category</p>
    </div>

    <!--filtered list events -->
    <div v-else class="grid md:grid-cols-3 gap-6">
      <event-card v-for="event in filteredEvents" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsPage',

  data() {
    return {
      isLoading: true,
      spinnerLoadingTime: 400,
      searchQuery: '',
      selectedCategory: 'All',
      selectedLocation: 'All',
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, this.spinnerLoadingTime)
  },

  computed: {
    locations() {
      return [...new Set(this.$store.state.events.events.map((e) => e.location))]
    },

    filteredEvents() {
      let events = this.$store.state.events.events

      if (this.selectedCategory !== 'All') {
        events = events.filter((e) => e.category === this.selectedCategory)
      }

      if (this.searchQuery) {
        events = events.filter((e) =>
          e.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }

      if (this.selectedLocation !== 'All') {
        events = events.filter((e) => e.location === this.selectedLocation)
      }

      return events
    },
  },

  methods: {
    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = 'All'
      this.selectedLocation = 'All'
    },
  },
}
</script>
