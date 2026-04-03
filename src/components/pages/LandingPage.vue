<template>
  <!-- HERO SECTION -->
  <div class="bg-hero-gradient">
    <div class="section-container">
      <div
        id="hero"
        class="flex w-full flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 space-x-0 md:space-x-10"
      >
        <!-- hero content -->
        <div class="md:w-[50%] pt-16 md:pt-10 md:p-10 space-y-10">
          <h1 class="text-gradient text-7xl font-medium tracking-wide leading-50">
            Discover <br />
            Events <br />
            You'll Love
          </h1>
          <p class="text-slate- text-lg mt-4">
            Explore, buy, and manage your events tickets effortlessly with Eventra creating
            unforgettable memories..
          </p>

          <!-- call to actiion buttons -->
          <div
            class="mt-6 flex flex-col md:flex-row items-center md:w-auto md:space-x-10 space-y-4 md:space-y-0"
          >
            <button
              class="px-8 md:px-5 py-4 w-full rounded-lg text-white bg-linear-to-r bg-primary-gradient hover:scale-105 transition duration-200 shadow-md hover:shadow-xl"
            >
              <div class="flex items-center justify-center">
                <p>Explore Events</p>

                <font-awesome-icon icon="arrow-right" class="ml-2" />
              </div>
            </button>

            <button
              class="px-8 md:px-5 py-4 w-full rounded-lg text-primary font-medium bg-white border border-slate-300 hover:border-purple-400 hover:bg-purple-100 transition duration-200"
            >
              Get Started
            </button>
          </div>

          <!-- STATS -->
          <div class="mt-10 grid grid-cols-3 gap-6 text-center md:text-left">
            <!-- stat 1 -->
            <div>
              <h2
                class="text-2xl md:text-3xl font-semibold bg-primary-gradient bg-clip-text text-transparent"
              >
                10K+
              </h2>
              <p class="text-slate-500 text-sm mt-1">Events Hosted</p>
            </div>

            <!-- stat 2 -->
            <div>
              <h2
                class="text-2xl md:text-3xl font-semibold bg-gradient-to-r bg-primary-gradient bg-clip-text text-transparent"
              >
                50K+
              </h2>
              <p class="text-slate-500 text-sm mt-1">Happy Users</p>
            </div>

            <!-- stat 3 -->
            <div>
              <h2
                class="text-2xl md:text-3xl font-semibold bg-gradient-to-r bg-primary-gradient bg-clip-text text-transparent"
              >
                100+
              </h2>
              <p class="text-slate-500 text-sm mt-1">Cities Covered</p>
            </div>
          </div>
        </div>

        <!-- hero image -->
        <div class="md:w-[50%] relative">
          <img src="../../images/hero1.jpg" class="rounded-xl" />

          <!-- floating bubbles -->
          <!-- bubble 1-->
          <div
            class="absolute w-30 bg-white -top-6 -right-4 md:-top-8 md:-right-10 rounded-lg p-3 shadow-lg flex items-center space-x-2"
          >
            <!-- bubble icon circle-->
            <div class="rounded-full bg-green-200 w-10 h-10 flex items-center justify-center">
              <font-awesome-icon icon="arrow-trend-up" />
            </div>
            <!-- bubble text-->
            <div>
              <p class="text-sm font-semibold">234 Sold</p>
              <h3 class="text-xs text-slate-500">This Week</h3>
            </div>
          </div>
          <!-- bubble 2-->
          <div
            class="absolute animate-bounce-soft w-30 bg-white -bottom-6 -left-4 md:-bottom-8 md:-left-10 rounded-lg p-3 shadow-lg flex items-center space-x-2"
          >
            <!-- bubble icon circle-->
            <div class="rounded-full bg-purple-200 w-10 h-10 flex items-center justify-center">
              <font-awesome-icon icon="calendar" />
            </div>
            <!-- bubble text-->
            <div>
              <p class="text-sm font-semibold">Next Event</p>
              <h3 class="text-xs text-slate-500">Tech Fest 2025</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Featured events -->
  <div id="featured-events" class="section-container mt-14 flex flex-col">
    <!-- section header -->
    <div class="flex flex-col space-x-4 md:space-x-0 items-center justify-center w-full">
      <h2 class="text-4xl text-gradient">Featured Events</h2>
      <p class="text-slate-800 tracking-wide">Don't miss out on these popular events near you!</p>
    </div>

    <!-- event filter -->
    <div class="mt-8">
      <event-filter @selected-category="handleCategory"></event-filter>
    </div>

    <!-- event card -->

    <div class="mt-8">
      <event-card :featuredEvents="featuredEvents"></event-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      selectedCategory: 'All',
    }
  },
  methods: {
    handleCategory(category) {
      this.selectedCategory = category
    },
  },

  computed: {
    featuredEvents() {
      return this.$store.getters['events/featuredEvents'](this.selectedCategory)
    },
  },
}
</script>
