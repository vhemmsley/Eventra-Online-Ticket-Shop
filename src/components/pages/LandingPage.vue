<template>
  <!-- HERO SECTION -->
  <section class="bg-hero-gradient" id="hero">
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
  </section>

  <!-- Featured events -->
  <section id="featured-events" class="section-container mt-14 flex flex-col">
    <!-- section header -->
    <div class="flex flex-col space-x-4 md:space-x-0 items-center justify-center w-full">
      <h2 class="text-4xl text-gradient">Featured Events</h2>
      <p class="text-slate-800 tracking-wide">Don't miss out on these popular events near you!</p>
    </div>

    <!-- event filter -->
    <div class="mt-8">
      <event-filter @selected-category="handleCategory"></event-filter>
    </div>

    <!-- Event Display -->
    <div class="mt-8">
      <!-- LOADING spinner -->
      <div v-if="isLoading" class="animate-pulse p-4">
        <base-spinner></base-spinner>
      </div>

      <!-- no event available -->
      <div v-else-if="featuredEvents.length === 0" class="text-center py-10">
        <div class="text-4xl">🎭</div>
        <p class="text-lg font-semibold mt-4">No events found 😞</p>
        <p class="text-sm text-slate-400 mt-2">Try selecting a different category</p>
      </div>

      <!-- event card -->

      <event-card v-else :featuredEvents="featuredEvents"></event-card>
    </div>

    <!-- show more evnets button-->
    <button
      class="px-10 py-4 mt-8 shadow-lg font-semibold rounded-lg text-primary bg-white border border-slate-300 hover:border-purple-400 hover:bg-purple-100 hover:-translate-y-1 transition duration-300"
    >
      View All Events
    </button>
  </section>

  <!-- Why EVENTRA section-->
  <section id="whyeventra" class="section-container mt-24 flex flex-col">
    <div
      class="flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-10 md:space-y-0 items-center justify-center w-full"
    >
      <!-- Side HEADER -->
      <div class="md:w-[50%]">
        <h2 class="text-4xl md:text-5xl text-gradient text-center md:text-left">
          Why Choose Eventra?
        </h2>
        <p class="text-slate-500 mt-8">
          Experience the best in event discovery and ticketing with Eventra. We offer a seamless,
          user-friendly platform that connects you to a world of unforgettable events. Whether
          you're looking to attend exciting events or host your own.
        </p>
      </div>

      <!-- Users selection -->
      <div
        class="flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-6 md:space-y-0 mt-10 md:mt-0"
      >
        <!-- for attendees -->
        <base-card>
          <div class="space-y-4 px-20 py-5 md:p-4 flex flex-col items-center text-center">
            <div class="border rounded-xl p-4 bg-primary-gradient">
              <font-awesome-icon icon="users" class="text-white text-2xl" />
            </div>

            <h2 class="text-lg font-semibold">For Attendees</h2>

            <p class="text-sm text-slate-500">Find and attend amazing events</p>

            <button
              class="px-5 py-2 mt-8 shadow-lg font-semibold rounded-lg text-primary bg-purple-200 border border-slate-300 hover:border-purple-400 hover:bg-purple-100 transition duration-200"
            >
              Browse Events
            </button>
          </div>
        </base-card>

        <!-- for hosts-->
        <base-card>
          <div class="space-y-4 p-4 flex flex-col items-center text-center">
            <div class="border rounded-xl p-4 bg-primary-gradient">
              <font-awesome-icon icon="user-tie" class="text-white text-2xl" />
            </div>

            <h2 class="text-lg font-semibold">For Hosts</h2>

            <p class="text-sm text-slate-500">Create and manage your events</p>

            <button
              class="px-5 py-2 mt-8 shadow-lg font-semibold rounded-lg text-primary bg-purple-200 border border-slate-300 hover:border-purple-400 hover:bg-purple-100 transition duration-200"
            >
              Host an Event
            </button>
          </div>
        </base-card>
      </div>
    </div>
  </section>

  <!-- features list -->
  <section id="features" class="mt-24 bg-secondary-gradient">
    <div
      class="pt-10 grid grid-cols-1 md:grid-cols-3 gap-6 mx-5 md:mx-[10%] items-center justify-between"
    >
      <div class="flex flex-col items-center text-center">
        <div class="bg-purple-200 rounded-full w-16 h-16 flex items-center justify-center">
          <font-awesome-icon icon="check" class="text-green-500" />
        </div>
        <h3 class="text-lg font-semibold mt-4">Easy Event Discovery</h3>
        <p class="text-slate-500 text-sm mt-2">
          Find the perfect event for you with our intuitive search and filtering options.
        </p>
      </div>

      <div class="flex flex-col items-center text-center">
        <div class="bg-purple-200 rounded-full w-16 h-16 flex items-center justify-center">
          <font-awesome-icon icon="lock" class="text-blue-500" />
        </div>
        <h3 class="text-lg font-semibold mt-4">Secure Transactions</h3>
        <p class="text-slate-500 text-sm mt-2">
          Your payment information is protected with industry-standard security measures.
        </p>
      </div>

      <div class="flex flex-col items-center text-center">
        <div class="bg-purple-200 rounded-full w-16 h-16 flex items-center justify-center">
          <font-awesome-icon icon="user-friends" class="text-purple-500" />
        </div>
        <h3 class="text-lg font-semibold mt-4">Personalized Recommendations</h3>
        <p class="text-slate-500 text-sm mt-2">
          Get tailored event suggestions based on your interests and past activity.
        </p>
      </div>
    </div>
  </section>

  <!-- footer -->
  <footer class="bg-black">
    <div class="px-6 py-16 grid md:grid-cols-5 md:gap-10 mx-5 md:mx-[5%]">
      <!-- Logo + Description -->
      <div class="md:col-span-2">
        <!-- Logo -->
        <div class="group flex items-center space-x-2 cursor-pointer">
          <img
            src="/favicon.png"
            alt=""
            class="w-8 group-hover:scale-110 transition duration-300"
          />
          <h1
            class="text-3xl font-semibold bg-linear-to-r bg-primary-gradient bg-clip-text text-transparent"
          >
            Eventra
          </h1>
        </div>

        <p class="text-gray-400 mt-4">
          Making university events accessible and enjoyable for everyone.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold mb-2">For Attendees</h3>

        <ul class="space-y-3 text-gray-400">
          <li><a href="#" class="hover:text-green-400">Browse Events</a></li>
          <li>
            <a href="#services" class="hover:text-green-400">My Tickets</a>
          </li>
          <li>
            <a href="#explore" class="hover:text-green-400">How It Works</a>
          </li>
          <li><a href="#" class="hover:text-green-400">Sign Up</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-lg font-semibold mb-4">For Organizers</h3>

        <ul class="space-y-3 text-gray-400">
          <li><a class="hover:text-green-400">Dashboard</a></li>
          <li><a class="hover:text-green-400">Create Event</a></li>
          <li><a class="hover:text-green-400">Get Started</a></li>
          <li><a class="hover:text-green-400">Token Deployment</a></li>
        </ul>
      </div>

      <!-- Contact -->

      <div>
        <h3 class="text-lg font-semibold mb-4">Support</h3>

        <ul class="space-y-3 text-gray-400">
          <li><a class="hover:text-green-400">Terms of Service</a></li>
          <li><a class="hover:text-green-400">Privacy Policy</a></li>
          <li>Email: support@eventra.io</li>
          <li>Live Support Available</li>
          <li>24/7 Technical Assistance</li>
        </ul>

        Social Icons

        <div class="flex gap-4 mt-6">
          <div class="bg-gray-900 p-2 rounded-lg hover:bg-green-500 cursor-pointer">
            <font-awesome-icon icon="facebook-f" class="text-white" />
          </div>

          <div class="bg-gray-900 p-2 rounded-lg hover:bg-green-500 cursor-pointer">
            <font-awesome-icon icon="twitter" class="text-white" />
          </div>

          <div class="bg-gray-900 p-2 rounded-lg hover:bg-green-500 cursor-pointer">
            <font-awesome-icon icon="instagram" class="text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div
      class="flex justify-center items-center space-x-4 border-t border-gray-800 text-center py-6 text-gray-500"
    >
      © 2026 Eventra All Rights Reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      selectedCategory: 'All',
      isLoading: true,
      spinnerLoadingTime: 400,
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, this.spinnerLoadingTime)
  },

  methods: {
    handleCategory(category) {
      this.selectedCategory = category
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
      }, this.spinnerLoadingTime)
    },
  },

  computed: {
    featuredEvents() {
      return this.$store.getters['events/featuredEvents'](this.selectedCategory)
    },
  },
}
</script>
