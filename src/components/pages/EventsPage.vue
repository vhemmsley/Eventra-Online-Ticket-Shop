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
        />
      </div>

      <!-- event filter -->

      <div>
        <event-filter @selected-category="handleCategory"></event-filter>
      </div>

      <!-- location filter-->
      <div>
        <!-- dropdown filter -->
        <select
          v-model="selectedLocation"
          placeholder="hello"
          class="border-2 shadow-lg text-sm rounded-lg p-3 md:p-2 w-80 md:w-60 placeholder:text-md hover:border-purple-400 outline-purple-500"
        >
          <option value="All">🌍 All Locations</option>
          <option v-for="location in locations" :location>{{ location }}</option>
        </select>
      </div>

      <!--feedack -->
      <p>Showing 6 Events</p>
    </div>
  </section>
</template>

<script>
import EventFilter from '../layout/EventFilter.vue'

export default {
  name: 'EventsPage',

  data() {
    return {
      selectedCategory: 'All',
      isLoading: true,
      spinnerLoadingTime: 400,
      selectedLocation: 'All',
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, this.spinnerLoadingTime)
  },

  computed: {
    handleCategory(category) {
      this.selectedCategory = category
    },

    events() {
      return this.$store.state.events.events
    },

    locations() {
      return [...new Set(this.events.map((e) => e.location))]
    },
  },
}
</script>
