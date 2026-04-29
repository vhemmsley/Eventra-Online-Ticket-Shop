file_content = '''
<template>
  <!-- PAGE BACKGROUND -->
  <div class="min-h-screen flex justify-center bg-secondary-gradient px-4 py-10 md:py-6">
    <!-- CARD -->
    <div
      class="w-full max-w-4xl md:mt-0 py-0 md:py-0 h-full md:h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
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

            <p v-if="mode === 'login'" class="text-xs mt-1 text-red-500">
              Looks like you don't have an account?
              <span @click="toggleMode" class="underline cursor-pointer font-medium">
                Sign up instead
              </span>
            </p>

            <p
              v-if="mode === 'signup' || mode === 'signup_as_host'"
              class="text-xs mt-1 text-red-500"
            >
              Looks like you already have an account?
              <span @click="toggleMode" class="underline cursor-pointer font-medium">
                Log in instead
              </span>
            </p>
          </div>
        </div>

        <!-- LOGIN / SIGNUP FORM -->
        <form @submit.prevent="handleSubmit">
          <div class="space-y-5">
            <!-- Full Name -->
            <div v-if="mode === 'signup'">
              <label class="text-sm text-slate-600 font-medium">Full Name *</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 shadow-sm transition-all"
              >
                <span class="mr-2 text-lg">👱</span>
                <input
                  v-model="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  class="w-full outline-none text-sm bg-transparent"
                />
              </div>
              <p v-if="errors.fullName" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.fullName }}
              </p>
            </div>

            <!-- PHONE NUMBER WITH COUNTRY CODE -->
            <div v-if="mode === 'signup' || mode === 'signup_as_host'">
              <label class="text-sm text-slate-600 font-medium">Phone Number *</label>
              <div
                class="flex items-center mt-2 border rounded-lg focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 shadow-sm transition-all overflow-hidden"
              >
                <!-- Country Code Dropdown -->
                <div class="relative border-r border-slate-200">
                  <button
                    type="button"
                    @click="toggleCountryDropdown"
                    class="flex items-center gap-1 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition text-sm min-w-[90px]"
                  >
                    <span class="text-base">{{ selectedCountry.flag }}</span>
                    <span class="font-medium text-slate-700">{{ selectedCountry.dialCode }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-3 h-3 text-slate-400"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <!-- Dropdown Menu -->
                  <div
                    v-if="showCountryDropdown"
                    class="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto country-scroll"
                  >
                    <div class="sticky top-0 bg-white p-2 border-b border-slate-100">
                      <input
                        v-model="countrySearch"
                        type="text"
                        placeholder="Search country..."
                        class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-purple-500"
                        @click.stop
                      />
                    </div>
                    <div
                      v-for="country in filteredCountries"
                      :key="country.code"
                      @click="selectCountry(country)"
                      class="flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 cursor-pointer transition"
                      :class="selectedCountry.code === country.code ? 'bg-purple-50' : ''"
                    >
                      <span class="text-lg">{{ country.flag }}</span>
                      <span class="text-sm text-slate-700 flex-1">{{ country.name }}</span>
                      <span class="text-sm font-medium text-slate-500">{{ country.dialCode }}</span>
                    </div>
                    <div
                      v-if="filteredCountries.length === 0"
                      class="px-4 py-3 text-sm text-slate-400 text-center"
                    >
                      No countries found
                    </div>
                  </div>
                </div>
                <!-- Phone Input -->
                <input
                  v-model="phoneNumber"
                  type="tel"
                  :placeholder="selectedCountry.placeholder"
                  class="flex-1 px-3 py-2.5 outline-none text-sm bg-transparent"
                  @blur="formatPhoneNumber"
                  @focus="showCountryDropdown = false"
                />
              </div>
              <p
                v-if="errors.phoneNumber"
                class="text-red-500 text-xs mt-1 flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.phoneNumber }}
              </p>
              <p class="text-xs text-slate-400 mt-1">Format: {{ selectedCountry.format }}</p>
            </div>

            <!-- Host Name -->
            <div v-if="mode === 'signup_as_host'">
              <label class="text-sm text-slate-600 font-medium">Host Name *</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 shadow-sm transition-all"
              >
                <span class="mr-2 text-lg">🎤</span>
                <input
                  v-model="hostName"
                  type="text"
                  placeholder="Enter your host alias"
                  class="w-full outline-none text-sm bg-transparent"
                />
              </div>
              <p v-if="errors.hostName" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.hostName }}
              </p>
            </div>

            <!-- EMAIL -->
            <div>
              <label class="text-sm text-slate-600 font-medium">Email *</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 shadow-sm transition-all"
              >
                <span class="mr-2 text-lg">✉️</span>
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full outline-none text-sm bg-transparent"
                />
              </div>
              <p v-if="errors.email" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.email }}
              </p>
            </div>

            <!-- PASSWORD -->
            <div>
              <label class="text-sm text-slate-600 font-medium">Password *</label>
              <div
                class="flex items-center mt-2 border rounded-lg px-3 py-2.5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 shadow-sm transition-all"
              >
                <span class="mr-2 text-lg">🔑</span>
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="w-full outline-none text-sm bg-transparent"
                />
                <!-- EYE TOGGLE BUTTON -->
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="ml-2 text-slate-400 hover:text-purple-600 transition focus:outline-none p-1"
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
              <p v-if="errors.password" class="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.password }}
              </p>
              <p v-if="errors.general" class="text-red-500 text-sm text-center mt-2">
                {{ errors.general }}
              </p>
            </div>

            <!-- HOST SIGNUP AND FORGOT PASSWORD -->
            <div class="flex justify-between items-center pt-1">
              <div
                @click="signupAsHost"
                v-if="mode === 'signup'"
                class="text-sm text-purple-600 hover:underline cursor-pointer font-medium"
              >
                Signup as host?
              </div>
              <div
                @click="signupAsHost"
                v-if="mode === 'signup_as_host'"
                class="text-sm text-purple-600 hover:underline cursor-pointer font-medium"
              >
                Signup as attendee?
              </div>
              <div
                class="text-sm text-purple-600 hover:underline cursor-pointer font-medium ml-auto"
              >
                Forgot password?
              </div>
            </div>

            <!-- SUBMIT BUTTON -->
            <button
              type="submit"
              :disabled="isSubmitting"
              :class="[
                'w-full py-3 rounded-xl text-white transition duration-200 shadow-md font-medium',
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed opacity-70'
                  : 'bg-primary-gradient hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]',
              ]"
            >
              {{
                isSubmitting
                  ? mode === 'login'
                    ? 'Logging in...'
                    : 'Signing up...'
                  : mode === 'login'
                    ? 'Log In'
                    : 'Sign Up'
              }}
            </button>
          </div>
        </form>

        <!-- DIVIDER -->
        <div class="flex items-center my-6">
          <div class="flex-1 border-t border-slate-200"></div>
          <span class="px-4 text-sm text-slate-400">or continue with</span>
          <div class="flex-1 border-t border-slate-200"></div>
        </div>

        <!-- SOCIAL LOGIN -->
        <div class="flex items-center justify-center">
          <button
            @click.prevent="signinWithGoogle"
            class="flex items-center justify-center gap-3 border-2 border-slate-200 rounded-xl py-2.5 px-8 hover:bg-slate-50 hover:border-slate-300 transition w-full md:w-auto"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span class="text-sm font-medium text-slate-600">Google</span>
          </button>
        </div>

        <!-- TOGGLE MODE -->
        <p class="text-sm text-center text-slate-500 mt-8">
          {{ mode === 'login' ? "Don't have an account?" : 'Already have an account?' }}
          <span
            @click="toggleMode"
            class="text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            {{ mode === 'login' ? 'Sign up' : 'Log in' }}
          </span>
        </p>
      </div>

      <!-- RIGHT SIDE (IMAGE) -->
      <div class="hidden md:block md:w-1/2 relative">
        <img
          src="../../../images/loginimg.jpg"
          class="h-full w-full object-cover"
          alt="login visual"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
        <div class="absolute bottom-8 left-8 right-8 text-white">
          <p class="text-sm font-medium opacity-80">Discover Amazing Events</p>
          <h3 class="text-2xl font-bold mt-1">Join thousands of event lovers</h3>
        </div>
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
      phoneNumber: '',
      isSubmitting: false,
      showPassword: false,
      errors: {},

      // Country code dropdown
      showCountryDropdown: false,
      countrySearch: '',
      selectedCountry: {
        code: 'NG',
        name: 'Nigeria',
        dialCode: '+234',
        flag: '🇳🇬',
        format: 'XXX XXX XXXX',
        placeholder: '801 234 5678',
        maxLength: 10,
      },
      countries: [
        {
          code: 'NG',
          name: 'Nigeria',
          dialCode: '+234',
          flag: '🇳🇬',
          format: 'XXX XXX XXXX',
          placeholder: '801 234 5678',
          maxLength: 10,
        },
        {
          code: 'GB',
          name: 'United Kingdom',
          dialCode: '+44',
          flag: '🇬🇧',
          format: 'XXXX XXXXXX',
          placeholder: '7700 900077',
          maxLength: 10,
        },
        {
          code: 'US',
          name: 'United States',
          dialCode: '+1',
          flag: '🇺🇸',
          format: '(XXX) XXX-XXXX',
          placeholder: '(201) 555-0123',
          maxLength: 10,
        },
        {
          code: 'GH',
          name: 'Ghana',
          dialCode: '+233',
          flag: '🇬🇭',
          format: 'XX XXX XXXX',
          placeholder: '24 123 4567',
          maxLength: 9,
        },
        {
          code: 'KE',
          name: 'Kenya',
          dialCode: '+254',
          flag: '🇰🇪',
          format: 'XXX XXX XXX',
          placeholder: '712 345 678',
          maxLength: 9,
        },
        {
          code: 'ZA',
          name: 'South Africa',
          dialCode: '+27',
          flag: '🇿🇦',
          format: 'XX XXX XXXX',
          placeholder: '83 123 4567',
          maxLength: 9,
        },
        {
          code: 'CA',
          name: 'Canada',
          dialCode: '+1',
          flag: '🇨🇦',
          format: '(XXX) XXX-XXXX',
          placeholder: '(416) 555-0123',
          maxLength: 10,
        },
        {
          code: 'AU',
          name: 'Australia',
          dialCode: '+61',
          flag: '🇦🇺',
          format: 'XXX XXX XXX',
          placeholder: '412 345 678',
          maxLength: 9,
        },
        {
          code: 'IN',
          name: 'India',
          dialCode: '+91',
          flag: '🇮🇳',
          format: 'XXXXX XXXXX',
          placeholder: '98765 43210',
          maxLength: 10,
        },
        {
          code: 'DE',
          name: 'Germany',
          dialCode: '+49',
          flag: '🇩🇪',
          format: 'XXX XXXXXXX',
          placeholder: '151 2345678',
          maxLength: 10,
        },
        {
          code: 'FR',
          name: 'France',
          dialCode: '+33',
          flag: '🇫🇷',
          format: 'X XX XX XX XX',
          placeholder: '6 12 34 56 78',
          maxLength: 9,
        },
        {
          code: 'NL',
          name: 'Netherlands',
          dialCode: '+31',
          flag: '🇳🇱',
          format: 'X XX XX XX XX',
          placeholder: '6 12 34 56 78',
          maxLength: 9,
        },
        {
          code: 'ES',
          name: 'Spain',
          dialCode: '+34',
          flag: '🇪🇸',
          format: 'XXX XXX XXX',
          placeholder: '612 345 678',
          maxLength: 9,
        },
        {
          code: 'IT',
          name: 'Italy',
          dialCode: '+39',
          flag: '🇮🇹',
          format: 'XXX XXX XXXX',
          placeholder: '312 345 6789',
          maxLength: 10,
        },
        {
          code: 'BR',
          name: 'Brazil',
          dialCode: '+55',
          flag: '🇧🇷',
          format: 'XX XXXXX-XXXX',
          placeholder: '11 91234-5678',
          maxLength: 11,
        },
        {
          code: 'MX',
          name: 'Mexico',
          dialCode: '+52',
          flag: '🇲🇽',
          format: 'XXX XXX XXXX',
          placeholder: '551 234 5678',
          maxLength: 10,
        },
        {
          code: 'JP',
          name: 'Japan',
          dialCode: '+81',
          flag: '🇯🇵',
          format: 'XX XXXX XXXX',
          placeholder: '90 1234 5678',
          maxLength: 10,
        },
        {
          code: 'CN',
          name: 'China',
          dialCode: '+86',
          flag: '🇨🇳',
          format: 'XXX XXXX XXXX',
          placeholder: '138 1234 5678',
          maxLength: 11,
        },
        {
          code: 'SG',
          name: 'Singapore',
          dialCode: '+65',
          flag: '🇸🇬',
          format: 'XXXX XXXX',
          placeholder: '8123 4567',
          maxLength: 8,
        },
        {
          code: 'AE',
          name: 'UAE',
          dialCode: '+971',
          flag: '🇦🇪',
          format: 'XX XXX XXXX',
          placeholder: '50 123 4567',
          maxLength: 9,
        },
        {
          code: 'SA',
          name: 'Saudi Arabia',
          dialCode: '+966',
          flag: '🇸🇦',
          format: 'XX XXX XXXX',
          placeholder: '50 123 4567',
          maxLength: 9,
        },
        {
          code: 'EG',
          name: 'Egypt',
          dialCode: '+20',
          flag: '🇪🇬',
          format: 'XXX XXX XXXX',
          placeholder: '100 123 4567',
          maxLength: 10,
        },
        {
          code: 'UG',
          name: 'Uganda',
          dialCode: '+256',
          flag: '🇺🇬',
          format: 'XXX XXX XXX',
          placeholder: '712 345 678',
          maxLength: 9,
        },
        {
          code: 'TZ',
          name: 'Tanzania',
          dialCode: '+255',
          flag: '🇹🇿',
          format: 'XXX XXX XXX',
          placeholder: '612 345 678',
          maxLength: 9,
        },
        {
          code: 'RW',
          name: 'Rwanda',
          dialCode: '+250',
          flag: '🇷🇼',
          format: 'XXX XXX XXX',
          placeholder: '788 123 456',
          maxLength: 9,
        },
      ],
    }
  },

  mounted() {
    const mode = this.$route.query.mode
    if (mode === 'signup' || mode === 'login' || mode === 'signup_as_host') {
      this.mode = mode
    } else {
      this.mode = 'login'
    }
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  computed: {
    queryPath() {
      return this.$route.query.mode
    },

    isAuthPage() {
      return this.$route.path === '/auth'
    },

    filteredCountries() {
      if (!this.countrySearch) return this.countries
      const search = this.countrySearch.toLowerCase()
      return this.countries.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.dialCode.includes(search) ||
          c.code.toLowerCase().includes(search),
      )
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

    //  phone number watcher
    phoneNumber(newVal, oldVal) {
      // Prevent infinite loops - only format if digits changed
      const newDigits = newVal.replace(/\D/g, '')
      const oldDigits = oldVal.replace(/\D/g, '')
      if (newDigits !== oldDigits) {
        this.$nextTick(() => {
          this.formatPhoneNumber()
        })
      }
    },
  },

  methods: {
    toggleMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login'
      this.errors = {}
      this.phoneNumber = ''
    },

    signupAsHost() {
      this.mode = this.mode === 'signup' ? 'signup_as_host' : 'signup'
      this.errors = {}
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },

    toggleCountryDropdown() {
      this.showCountryDropdown = !this.showCountryDropdown
      if (this.showCountryDropdown) {
        this.$nextTick(() => {
          this.countrySearch = ''
        })
      }
    },

    selectCountry(country) {
      this.selectedCountry = country
      this.showCountryDropdown = false
      this.countrySearch = ''
      // Clear phone number when country changes to prevent format mismatch
      this.phoneNumber = ''
      this.errors.phoneNumber = null
    },

    handleClickOutside(event) {
      const dropdown = event.target.closest('.relative')
      if (!dropdown) {
        this.showCountryDropdown = false
      }
    },

    formatPhoneNumber() {
      // Get only digits from current value
      let digits = this.phoneNumber.replace(/\D/g, '')

      // Limit to max length
      if (digits.length > this.selectedCountry.maxLength) {
        digits = digits.slice(0, this.selectedCountry.maxLength)
      }

      // Build formatted string by walking through format pattern
      const format = this.selectedCountry.format
      let result = ''
      let digitIndex = 0

      for (let i = 0; i < format.length && digitIndex < digits.length; i++) {
        if (format[i] === 'X') {
          result += digits[digitIndex++]
        } else {
          result += format[i]
        }
      }

      // If there are remaining digits after format pattern is exhausted, append them
      while (digitIndex < digits.length) {
        result += digits[digitIndex++]
      }

      this.phoneNumber = result
    },

    validatePhoneNumber() {
      const digitsOnly = this.phoneNumber.replace(/\D/g, '')

      if (!this.phoneNumber || !digitsOnly) {
        return 'Phone number is required'
      }

      if (digitsOnly.length < 7) {
        return 'Phone number is too short'
      }

      if (digitsOnly.length !== this.selectedCountry.maxLength) {
        return `Phone number should be ${this.selectedCountry.maxLength} digits for ${this.selectedCountry.name}`
      }

      // Country-specific validation (using digitsOnly)
      const validators = {
        NG: (d) =>
          /^[7-9]\d{9}$/.test(d)
            ? null
            : 'Invalid Nigerian phone number. Should start with 7, 8, or 9',
        GB: (d) => (/^7\d{9}$/.test(d) ? null : 'Invalid UK mobile number. Should start with 7'),
        US: (d) => (/^[2-9]\d{9}$/.test(d) ? null : 'Invalid US phone number'),
        GH: (d) => (/^[2-5]\d{8}$/.test(d) ? null : 'Invalid Ghanaian phone number'),
        KE: (d) => (/^[17]\d{8}$/.test(d) ? null : 'Invalid Kenyan phone number'),
      }

      const validator = validators[this.selectedCountry.code]
      if (validator) {
        return validator(digitsOnly)
      }

      return null
    },

    async handleSubmit() {
      const isValid = this.validateForm()
      if (!isValid) return

      this.isSubmitting = true
      this.errors.auth = null

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
            fullName: this.fullName,
            phoneNumber: this.selectedCountry.dialCode + ' ' + this.phoneNumber,
            hostName: this.hostName,
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
      } finally {
        this.isSubmitting = false
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
      if (this.mode === 'signup' && !this.fullName.trim()) {
        this.errors.fullName = 'Full name is required'
      } else if (this.mode === 'signup' && this.fullName.trim().length < 2) {
        this.errors.fullName = 'Full name must be at least 2 characters'
      }

      // PHONE NUMBER (for both signup modes)
      if (this.mode !== 'login') {
        const phoneError = this.validatePhoneNumber()
        if (phoneError) {
          this.errors.phoneNumber = phoneError
        }
      }

      // HOST NAME (only for host signup)
      if (this.mode === 'signup_as_host' && !this.hostName.trim()) {
        this.errors.hostName = 'Host name is required'
      }

      return Object.keys(this.errors).length === 0
    },

    async signinWithGoogle() {
      try {
        await this.$store.dispatch('auth/googleSignIn')
        this.$router.push('/events')
      } catch (err) {
        console.error('Google sign-in failed:', err)
      }
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

<style scoped>
/* Custom scrollbar for country dropdown */
.country-scroll::-webkit-scrollbar {
  width: 6px;
}
.country-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.country-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
</style>
'''
