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
          <p class="text-lg mt-4">
            Explore, buy, and manage your events tickets effortlessly with Eventra creating
            unforgettable memories..
          </p>

          <!-- call to actiion buttons -->
          <div
            class="mt-6 flex flex-col md:flex-row items-center md:w-auto md:space-x-10 space-y-4 md:space-y-0"
          >
            <router-link
              to="/events"
              class="px-8 md:px-5 py-4 w-full rounded-lg text-white bg-primary-gradient hover:scale-105 transition duration-200 shadow-md hover:shadow-xl"
            >
              <div class="flex items-center justify-center">
                <p>Explore Events</p>

                <font-awesome-icon icon="arrow-right" class="ml-2" />
              </div>
            </router-link>

            <router-link
              to="/auth"
              class="px-8 md:px-5 py-4 w-full rounded-lg text-primary font-medium bg-white border border-slate-300 hover:border-purple-400 hover:bg-purple-100 transition duration-200"
            >
              <span class="flex items-center justify-center">Get Started</span>
            </router-link>
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
                class="text-2xl md:text-3xl font-semibold bg-primary-gradient bg-clip-text text-transparent"
              >
                50K+
              </h2>
              <p class="text-slate-500 text-sm mt-1">Happy Users</p>
            </div>

            <!-- stat 3 -->
            <div>
              <h2
                class="text-2xl md:text-3xl font-semibold bg-primary-gradient bg-clip-text text-transparent"
              >
                100+
              </h2>
              <p class="text-slate-500 text-sm mt-1">Cities Covered</p>
            </div>
          </div>
        </div>

        <!-- hero image -->
        <div class="md:w-[50%] pb-2 md:pb-0 relative">
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
              <h3 class="text-xs text-slate-500">
                {{ nextUpcomingEvent?.title || 'No upcoming events' }}
              </h3>
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
      <event-filter v-model:selectedCategory="selectedCategory"></event-filter>
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

      <div v-else class="grid md:grid-cols-3 gap-6">
        <event-card v-for="event in featuredEvents" :key="event.id" :event="event" />
      </div>
    </div>

    <!-- show more evnets button-->
    <router-link
      to="/events"
      class="px-10 py-4 mt-8 shadow-lg font-semibold rounded-lg text-primary bg-white border border-slate-300 hover:border-purple-400 hover:bg-purple-100 hover:-translate-y-1 transition duration-300"
    >
      View All Events
    </router-link>
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

            <router-link
              to="/events"
              class="px-5 py-2 mt-8 shadow-lg font-semibold rounded-lg text-primary bg-purple-200 border border-slate-300 hover:border-purple-400 hover:bg-purple-100 transition duration-200"
            >
              Browse Events
            </router-link>
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
  <section id="features" class="mt-16 bg-secondary-gradient">
    <div
      class="pt-10 pb-10 grid grid-cols-1 md:grid-cols-3 gap-6 mx-16 md:mx-[10%] items-center justify-between"
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

  <!-- FAQ Heading -->
  <section id="faq" class="mb-10">
    <div class="container mx-auto mt-10">
      <h2 class="text-3xl md:text-5xl text-gradient text-center">Frequently Asked Questions</h2>
      <p class="max-w-lg px-6 mx-auto text-center text-sm text-slate-500 mt-4">
        Here are some of our FAQs. If you have any other questions, please email us.
      </p>
    </div>

    <div class="container mx-auto px-6 mt-8">
      <div class="max-w-5xl mx-auto">
        <div v-for="(faq, index) in faqs" :key="index" class="py-2 border-b">
          <!-- FAQ Header -->
          <div
            class="flex justify-between items-center py-3 text-gray-500 cursor-pointer"
            @click="toggleFaq(index)"
          >
            <div :class="{ 'hover:text-purple-500 text-purple-600': activeFaq === index }">
              {{ faq.question }}
            </div>
            <div
              :class="{
                'transform rotate-180 text-purple-500': activeFaq === index,
                'transform rotate-0': activeFaq !== index,
              }"
              class="transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                <path fill="none" stroke="currentColor" stroke-width="3" d="M1 1l8 8 8-8" />
              </svg>
            </div>
          </div>

          <!-- FAQ Content -->
          <div v-show="activeFaq === index" class="overflow-hidden transition-all duration-500">
            <p class="py-2 text-gray-400">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- footer -->
  <footer class="bg-black">
    <div class="px-6 md:py-8 pb-1 pt-8 grid md:grid-cols-5 md:gap-10 mx-5 md:mx-[5%]">
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

        <p class="text-gray-400 mt-4">Making events accessible and enjoyable for everyone.</p>

        <!-- Social  -->

        <div class="flex gap-4 mt-6">
          <div
            class="bg-gray-900 p-3 rounded-xl hover:scale-110 hover:bg-primary-gradient transition duration-300 cursor-pointer"
          >
            facebook
          </div>

          <div
            class="bg-gray-900 p-3 rounded-xl hover:scale-110 hover:bg-primary-gradient transition duration-300 cursor-pointer"
          >
            instagram
          </div>

          <div
            class="bg-gray-900 p-3 rounded-xl hover:scale-110 hover:bg-primary-gradient transition duration-300 cursor-pointer"
          >
            twitter
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold mb-2">For Attendees</h3>

        <ul class="space-y-3 text-gray-400">
          <li>
            <router-link to="/events" class="hover:text-green-400">Browse Events</router-link>
          </li>
          <li>
            <a href="#services" class="hover:text-green-400">My Tickets</a>
          </li>
          <li>
            <a href="#features" class="hover:text-green-400">How It Works</a>
          </li>

          <li class="hover:text-green-400 group">
            <router-link to="/auth">Sign Up</router-link>
          </li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-lg font-semibold mb-4">For Organizers</h3>

        <ul class="space-y-3 text-gray-400">
          <li><a class="hover:text-green-400">Dashboard</a></li>
          <li><a class="hover:text-green-400">Create Event</a></li>
          <li><a class="hover:text-green-400">Get Started</a></li>
        </ul>
      </div>

      <!-- Contact -->

      <div>
        <h3 class="text-lg font-semibold mb-4">Support</h3>

        <ul class="space-y-3 text-gray-400">
          <li><a class="hover:text-green-400">Terms of Service</a></li>
          <li><a class="hover:text-green-400">Privacy Policy</a></li>
          <li>Email: support@eventra.io</li>
          <li>24/7 Live Support Available</li>
        </ul>
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

      spinnerLoadingTime: 400,

      activeFaq: null,
      faqs: [
        {
          question: 'How do I book an event on Eventra?',
          answer:
            "Browse events, select the one you’re interested in, and click 'Get Passes.' Complete the checkout process and receive instant confirmation.",
        },
        {
          question: 'Is my payment secure?',
          answer:
            'Yes. All payments on Eventra are processed through secure and trusted payment systems.',
        },
        {
          question: 'Can I create and manage my own events?',
          answer:
            'Absolutely. Eventra allows organizers to create, manage, and promote events easily.',
        },
        {
          question: 'How do I receive my event pass?',
          answer:
            'Once your booking is complete, your pass is delivered instantly and can be accessed from your account or email.',
        },
        {
          question: 'What happens if an event is sold out?',
          answer:
            'If an event is sold out, you won’t be able to book passes. Explore similar events or check back for availability.',
        },
      ],
    }
  },

  mounted() {
    this.$store.dispatch('events/fetchFeaturedEvents')
    this.$store.dispatch('events/fetchEvents')

    setTimeout(() => {
      this.isLoading = false
    }, this.spinnerLoadingTime)
  },

  methods: {
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index
    },
  },

  watch: {
    selectedCategory() {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
      }, this.spinnerLoadingTime)
    },
  },

  computed: {
    nextUpcomingEvent() {
      const events = this.$store.state.events.events || []

      const today = new Date()

      const upcomingEvents = events
        .filter((event) => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date)) // 👈 sort properly

      return upcomingEvents.length ? upcomingEvents[0] : null
    },
    featuredEvents() {
      const featuredEvents = this.$store.state.events.featuredEvents

      if (this.selectedCategory === 'All') {
        return featuredEvents
      }

      return featuredEvents.filter((event) => event.category === this.selectedCategory)
    },

    isLoading() {
      return this.$store.state.events.isLoading
    },
  },
}
</script>
