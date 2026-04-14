<template>
  <!-- PAGE BACKGROUND -->
  <div class="min-h-screen flex justify-center bg-secondary-gradient px-4 py-10 md:py-6">
    <!-- CARD -->
    <div
      class="w-full max-w-4xl md:mt-0 py-4 md:py-0 h-full md:h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
    >
      <!-- LEFT SIDE (FORM) -->
      <div class="w-full md:w-1/2 p-8 md:p-12">
        <!-- HEADER -->

        <h1 class="text-3xl font-semibold text-gradient mb-2">
          {{
            mode == 'login'
              ? 'Welcome Back👋'
              : mode == 'signup_as_host'
                ? 'Sign Up as Host'
                : 'Sign Up'
          }}
        </h1>

        <p class="text-sm text-slate-500 mb-4">
          {{ mode == 'login' ? 'Log in' : 'Create an account' }}
          to discover and manage amazing events or
          {{ mode == 'login' ? 'sign up' : 'log in' }} below.
        </p>

        <!-- LOGIN / signup FORM -->
        <form @submit.prevent="handleSubmit()">
          <div class="space-y-6">
            <!-- FullName -->
            <div v-if="mode === 'signup'">
              <label class="text-sm text-slate-600">Full Name</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
              >
                <span class="mr-2">✉️</span>
                <input
                  v-model="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full outline-none text-sm"
                />
              </div>
            </div>

            <!-- sign up as host -->
            <div v-if="mode === 'signup_as_host'">
              <label class="text-sm text-slate-600">Host Name</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
              >
                <span class="mr-2">✉️</span>
                <input
                  v-model="hostName"
                  type="text"
                  placeholder="Enter your host alias"
                  class="w-full outline-none text-sm"
                />
              </div>
            </div>

            <!-- EMAIL -->
            <div>
              <label class="text-sm text-slate-600">Email</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
              >
                <span class="mr-2">✉️</span>
                <input
                  v-model="email"
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
                  v-model="password"
                  type="password"
                  placeholder="Enter your password"
                  class="w-full outline-none text-sm"
                />
              </div>
            </div>

            <!-- host signup and forget password-->
            <div class="flex justify-between">
              <!-- signup as host -->

              <div
                @click="signupAsHost()"
                v-if="mode === 'signup'"
                class="text-sm text-purple-600 hover:underline cursor-pointer"
              >
                Signup as host?
              </div>

              <!-- signup as user -->

              <div
                @click="signupAsHost()"
                v-if="mode === 'signup_as_host'"
                class="text-sm text-purple-600 hover:underline cursor-pointer"
              >
                Signup as attendee?
              </div>

              <!-- FORGOT PASSWORD -->

              <div class="text-sm text-purple-600 hover:underline cursor-pointer">
                Forgot password?
              </div>
            </div>

            <!-- LOGIN BUTTON -->
            <button
              type="submit"
              class="w-full py-3 rounded-lg text-white bg-primary-gradient hover:scale-[1.02] transition duration-200 shadow-md hover:shadow-xl"
            >
              {{ mode === 'login' ? 'Log In' : 'Sign Up' }}
            </button>
          </div>
        </form>

        <!-- DIVIDER -->
        <div class="flex items-center my-2">
          <div class="flex-1 border-t"></div>
          <span class="px-3 text-sm text-slate-400">or continue with</span>
          <div class="flex-1 border-t"></div>
        </div>

        <!-- SOCIAL LOGIN -->
        <div class="flex items-center justify-center">
          <button
            @click.prevent="signinWithGoogle()"
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
      email: '',
      password: '',
      fullName: '',
      hostName: '',
    }
  },

  mounted() {
    const mode = this.$route.query.mode

    if (mode === 'signup' || mode === 'login' || mode === 'signup_as_host') {
      this.mode = mode
    } else {
      this.mode = 'login'
    }
  },

  computed: {
    queryPath() {
      return this.$route.query.mode
    },

    isAuthPage() {
      return this.$route.path === '/auth'
    },
  },

  watch: {
    queryPath(newVal) {
      if (newVal === 'signup' || newVal === 'login' || newVal === 'signup_as_host') {
        this.mode = newVal
      } else {
        this.mode = 'login'
      }
    },

    isAuthPage(isAuth) {
      if (!isAuth) {
        this.mode = 'login'
      }
    },
  },

  methods: {
    toggleMode() {
      const newMode = this.mode === 'login' ? 'signup' : 'login'
      this.mode = newMode
    },

    signupAsHost() {
      this.mode = this.mode === 'signup' ? 'signup_as_host' : 'signup'
    },

    async signinWithGoogle() {
      try {
        await this.$store.dispatch('auth/googleSignIn')
        this.$router.push('/events')
      } catch (err) {
        console.error('Google sign-in failed:', err)
      }
    },

    handleSubmit() {
      if (this.mode === 'login') {
        this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })

        console.log('Login submitted with:', {
          email: this.email,
          password: this.password,
        })
      } else if (this.mode === 'signup') {
        this.$store.dispatch('auth/signup', {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
          role: 'attendee',
        })

        console.log('Signup submitted with:', {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
          role: 'attendee',
        })
      } else if (this.mode === 'signup_as_host') {
        this.$store.dispatch('auth/signup', {
          hostName: this.hostName,
          email: this.email,
          password: this.password,
          role: 'host',
        })

        console.log('Signup as host submitted with:', {
          hostName: this.hostName,
          email: this.email,
          password: this.password,
          role: 'host',
        })
      } else {
        this.$router.push('/auth?mode=login')
      }
    },
  },
}
</script>
