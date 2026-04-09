<template>
  <!-- PAGE BACKGROUND -->
  <div class="min-h-screen flex items-center justify-center bg-secondary-gradient px-4 py-6">
    <!-- CARD -->
    <div
      class="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
    >
      <!-- LEFT SIDE (FORM) -->
      <div class="w-full md:w-1/2 p-8 md:p-12">
        <!-- HEADER -->

        <h1 class="text-3xl font-semibold text-gradient mb-2">
          {{ mode == 'login' ? 'Welcome Back👋' : 'Sign Up' }}
        </h1>

        <p class="text-sm text-slate-500 mb-8">
          {{ mode == 'login' ? 'Log in' : 'Create an account' }}
          to discover and manage amazing events.
        </p>

        <!-- LOGIN FORM -->
        <div v-if="mode === 'login'" class="space-y-6">
          <!-- EMAIL -->
          <div>
            <label class="text-sm text-slate-600">Email</label>
            <div
              class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
            >
              <span class="mr-2">✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="text-sm text-slate-600">Password</label>
            <div
              class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
            >
              <span class="mr-2">🔑</span>
              <input
                type="password"
                placeholder="Enter your password"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- FORGOT PASSWORD -->
          <div class="text-right">
            <span class="text-sm text-purple-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <!-- LOGIN BUTTON -->
          <button
            class="w-full py-3 rounded-lg text-white bg-primary-gradient hover:scale-[1.02] transition duration-200 shadow-md hover:shadow-xl"
          >
            Log In
          </button>
        </div>

        <!-- SIGN UP FORM -->
        <div v-else class="space-y-6">
          <!-- EMAIL -->
          <div>
            <label class="text-sm text-slate-600">Email</label>
            <div
              class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
            >
              <span class="mr-2">✉️</span>
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- PASSWORD -->
          <div>
            <label class="text-sm text-slate-600">Password</label>
            <div
              class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
            >
              <span class="mr-2">🔑</span>
              <input
                type="password"
                placeholder="Enter your password"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- FORGOT PASSWORD -->
          <div class="text-right">
            <span class="text-sm text-purple-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <!-- LOGIN BUTTON -->
          <button
            class="w-full py-3 rounded-lg text-white bg-primary-gradient hover:scale-[1.02] transition duration-200 shadow-md hover:shadow-xl"
          >
            {{ mode === 'login' ? 'Log In' : 'Sign Up' }}
          </button>
        </div>

        <!-- DIVIDER -->
        <div class="flex items-center my-2">
          <div class="flex-1 border-t"></div>
          <span class="px-3 text-sm text-slate-400">or continue with</span>
          <div class="flex-1 border-t"></div>
        </div>

        <!-- SOCIAL LOGIN -->
        <div class="flex items-center justify-center">
          <button
            class="flex items-center justify-center gap-2 border-2 rounded-lg py-2 px-20 hover:bg-gray-50 transition"
          >
            <img src="../../../images/socials/google.png" class="w-5" />
            <span class="text-sm">Google</span>
          </button>
        </div>

        <!-- SIGN UP AlERT -->
        <p v-if="mode === 'login'" class="text-sm text-center text-slate-500 mt-8">
          Don’t have an account?
          <span
            @click="toggleMode()"
            class="text-purple-600 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

        <!-- LOGIN AlERT -->
        <p v-else class="text-sm text-center text-slate-500 mt-8">
          I have an account?
          <span
            @click="toggleMode()"
            class="text-purple-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>

      <!-- RIGHT SIDE (IMAGE) -->
      <div class="hidden md:block md:w-1/2">
        <img
          src="../../../images/loginimg.jpg"
          class="h-full w-full object-cover"
          alt="login visual"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      mode: 'login',
    }
  },

  methods: {
    toggleMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login'
    },
  },
}
</script>
