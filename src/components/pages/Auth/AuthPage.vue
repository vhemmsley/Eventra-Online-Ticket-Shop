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

        <h1 class="text-3xl font-semibold mb-2">
          <span class="text-gradient">
            {{
              mode == 'login'
                ? 'Welcome Back ! '
                : mode == 'signup_as_host'
                  ? 'Sign Up as Host'
                  : 'Sign Up as Attendee'
            }}</span
          >
          👋
        </h1>

        <p class="text-sm text-slate-500 mb-4">
          {{ mode == 'login' ? 'Log in' : 'Create an account' }}
          to discover and manage amazing events or
          {{ mode == 'login' ? 'sign up' : 'log in' }} below.
        </p>

        <!-- ERROR ALERT -->
        <div
          v-if="errors.auth"
          class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2 animate-fade-in"
        >
          <span class="text-lg">⚠️</span>
          <div>
            <p class="font-medium">{{ errors.auth }}</p>

            <!-- suggestion -->
            <p v-if="mode === 'login'" class="text-xs mt-1 text-red-500">
              Looks like you don't have an account?
              <span @click="toggleMode" class="underline cursor-pointer font-medium">
                Sign up instead
              </span>
            </p>

            <p v-if="mode === 'signup'" class="text-xs mt-1 text-red-500">
              Looks like you already have an account?
              <span @click="toggleMode" class="underline cursor-pointer font-medium">
                Log in instead
              </span>
            </p>
          </div>
        </div>

        <!-- LOGIN / signup FORM -->
        <form @submit.prevent="handleSubmit()">
          <div class="space-y-6">
            <!-- FullName -->
            <div v-if="mode === 'signup'">
              <label class="text-sm text-slate-600">Full Name *</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
              >
                <span class="mr-2"></span>
                <input
                  v-model="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full outline-none text-sm"
                />
                <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">
                  {{ errors.fullName }}
                </p>
              </div>
            </div>

            <!-- sign up as host -->
            <div v-if="mode === 'signup_as_host'">
              <label class="text-sm text-slate-600">Host Name *</label>
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
                <p v-if="errors.hostName" class="text-red-500 text-xs mt-1">
                  {{ errors.hostName }}
                </p>
              </div>
            </div>

            <!-- EMAIL -->
            <div>
              <label class="text-sm text-slate-600">Email *</label>
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
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                  {{ errors.email }}
                </p>
              </div>
            </div>

            <!-- PASSWORD -->
            <div>
              <label class="text-sm text-slate-600">Password *</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2 focus-within:border-purple-500 shadow-sm"
              >
                <span class="mr-2">🔑</span>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="w-full outline-none text-sm"
                />
                <!-- EYE TOGGLE BUTTON -->
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="ml-2 text-slate-400 hover:text-purple-600 transition focus:outline-none"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <!-- EYE OPEN (password visible) -->
                  <svg
                    v-if="showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <!-- EYE SLASH (password hidden) -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                {{ errors.password }}
              </p>
              <p v-if="errors.general" class="text-red-500 text-sm text-center">
                {{ errors.general }}
              </p>
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
              :disabled="isSubmitting"
              :class="[
                'w-full py-3 rounded-lg text-white transition duration-200 shadow-md',
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed opacity-70 animate-pulse'
                  : 'bg-primary-gradient hover:scale-[1.02] hover:shadow-xl',
              ]"
            >
              {{
                isSubmitting
                  ? mode === 'login'
                    ? 'Logging in ...'
                    : 'Signing up ...'
                  : mode === 'login'
                    ? 'Log In'
                    : 'Sign Up'
              }}
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
          Don't have an account?
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
      isSubmitting: false,
      showPassword: false, // <-- NEW: tracks if password is visible
      errors: {},
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

    email() {
      this.errors.auth = null
    },
    password() {
      this.errors.auth = null
    },
  },

  methods: {
    toggleMode() {
      const newMode = this.mode === 'login' ? 'signup' : 'login'
      this.mode = newMode
      this.errors.auth = null // reset auth errors when toggling
    },

    signupAsHost() {
      this.mode = this.mode === 'signup' ? 'signup_as_host' : 'signup'
      this.errors.auth = null
    },

    // <-- NEW: toggles password visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    async signinWithGoogle() {
      try {
        await this.$store.dispatch('auth/googleSignIn')
        this.$router.push('/events')
      } catch (err) {
        console.error('Google sign-in failed:', err)
      }
    },

    async handleSubmit() {
      this.isSubmitting = true
      setTimeout(() => {
        this.isSubmitting = false
      }, 1000)

      const isValid = this.validateForm()

      if (!isValid) return

      this.errors.auth = null // reset previous error

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('auth/login', {
            email: this.email,
            password: this.password,
          })
        } else {
          await this.$store.dispatch('auth/signup', {
            email: this.email,
            password: this.password,
            role: this.mode === 'signup_as_host' ? 'host' : 'attendee',
          })
        }

        // push to user or host dashboard based on role
        const role = this.$store.getters['auth/role']

        if (role === 'host') {
          this.$router.push('/host/dashboard')
        } else {
          this.$router.push('/events')
        }
      } catch (err) {
        this.handleAuthError(err)
      }
    },

    validateForm() {
      this.errors = {}

      // EMAIL
      if (!this.email) {
        this.errors.email = 'Email is required'
      } else if (!this.email.includes('@')) {
        this.errors.email = 'Enter a valid email'
      }

      // PASSWORD
      if (!this.password) {
        this.errors.password = 'Password is required'
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters'
      }

      // FULL NAME (only for signup)
      if (this.mode === 'signup' && !this.fullName) {
        this.errors.fullName = 'Full name is required'
      }

      // HOST NAME (only for host signup)
      if (this.mode === 'signup_as_host' && !this.hostName) {
        this.errors.hostName = 'Host name is required'
      }

      return Object.keys(this.errors).length === 0
    },

    handleAuthError(error) {
      let message = 'Something went wrong. Please try again.'

      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email.'
          break

        case 'auth/wrong-password':
          message = 'Incorrect password. Try again.'
          break

        case 'auth/invalid-email':
          message = 'Invalid email format.'
          break

        case 'auth/email-already-in-use':
          message = 'This email already exists. Try logging in instead.'
          break

        case 'auth/popup-closed-by-user':
          message = 'Google sign-in was cancelled.'
          break
      }

      this.errors.auth = message
    },
  },
}
</script>
