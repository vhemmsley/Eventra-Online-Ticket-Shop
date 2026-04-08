<template>
  <!-- HEADER -->
  <div class="relative section-container pt-3 pb-3">
    <!-- LOGO -->
    <div class="group flex items-center space-x-2 cursor-pointer">
      <img src="/favicon.png" alt="" class="w-8 group-hover:scale-110 transition duration-300" />
      <router-link to="/">
        <h1
          class="text-3xl font-semibold bg-linear-to-r bg-primary-gradient bg-clip-text text-transparent"
        >
          Eventra
        </h1>
      </router-link>
    </div>

    <!-- DESKTOP NAV -->
    <ul class="hidden md:flex space-x-10 text-slate-700 font-medium">
      <li class="group hover:scale-105 transition duration-300 cursor-pointer">
        <router-link to="/events" class="hover:text-primary">Explore Events</router-link>
        <div
          class="border-b-2 border-purple-600 opacity-0 group-hover:opacity-100 mt-1 transition duration-300"
        ></div>
      </li>

      <li class="group hover:scale-105 transition duration-300 cursor-pointer">
        <a href="#" class="hover:text-primary">Help</a>
        <div
          class="border-b-2 border-primary opacity-0 group-hover:opacity-100 mt-1 transition duration-300"
        ></div>
      </li>
    </ul>

    <!-- LOGIN AND SIGNUP BUTTONS -->
    <div class="hidden md:flex space-x-3">
      <router-link to="/login">
        <button
          class="px-5 py-2 rounded-lg text-primary font-medium border border-slate-300 hover:border-purple-400 hover:bg-purple-100 transition duration-200"
        >
          Login
        </button>
      </router-link>

      <button
        class="px-5 py-2 rounded-lg text-white bg-linear-to-r bg-primary-gradient hover:scale-105 transition duration-200 shadow-md hover:shadow-xl"
      >
        Sign Up
      </button>
    </div>

    <!-- HAMBURGER -->
    <button @click="toggleMenu" class="z-50 block md:hidden focus:outline-none">
      <div class="space-y-1">
        <span
          class="block h-0.5 w-6 bg-primary-gradient transition-all duration-300"
          :class="{ 'rotate-45 translate-y-1.5': isOpen }"
        ></span>
        <span
          class="block h-0.5 w-6 bg-slate-700 transition-all duration-300"
          :class="{ 'opacity-0': isOpen }"
        ></span>
        <span
          class="block h-0.5 w-6 bg-primary-gradient transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
        ></span>
      </div>
    </button>
  </div>

  <!-- MOBILE MENU -->
  <div
    :class="[
      'absolute top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg flex flex-col items-center space-y-6 pt-24 pb-10 md:hidden transition-all duration-300 z-40',
      isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none',
    ]"
  >
    <a href="#" @click="toggleMenu" class="text-slate-700 text-lg hover:text-purple-600 transition">
      Explore Events
    </a>

    <a href="#" @click="toggleMenu" class="text-slate-700 text-lg hover:text-purple-600 transition">
      Help
    </a>

    <!-- divider -->
    <div class="w-10 h-[2px] bg-slate-200"></div>

    <!-- buttons -->

    <router-link to="/login">
      <button
        @click="toggleMenu"
        class="px-20 py-2 rounded-lg text-purple-600 border border-slate-300 hover:bg-purple-100 transition"
      >
        Login
      </button>
    </router-link>

    <button
      class="w-3/4 px-5 py-2 rounded-lg text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 shadow-md hover:shadow-xl transition"
    >
      Sign Up
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style scoped></style>
