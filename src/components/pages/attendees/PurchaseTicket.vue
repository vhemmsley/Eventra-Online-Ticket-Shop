<template>
  <div class="min-h-screen bg-hero-gradient px-4 md:px-[5%] py-6 md:py-12">
    <!-- LOADING -->
    <div v-if="isLoading" class="max-w-6xl mx-auto animate-pulse">
      <div class="h-96 bg-slate-200 rounded-2xl"></div>
    </div>

    <!-- MAIN -->
    <div v-else class="max-w-5xl mx-auto">
      <!-- Back Button -->
      <button
        @click="$router.back()"
        class="mb-6 flex items-center gap-2 text-slate-900 hover:text-purple-600 transition group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span class="text-sm font-medium">Back to Events</span>
      </button>

      <div class="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8">
        <!-- LEFT: Event Details (3 columns) -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Hero Image -->
          <div class="relative rounded-2xl overflow-hidden shadow-lg group">
            <img
              :src="event.image"
              class="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="event.title"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            ></div>

            <!-- Status Badge -->
            <div class="absolute top-4 left-4">
              <span
                :class="[
                  'px-4 py-1.5 text-white text-xs font-semibold rounded-full backdrop-blur-sm',
                  event.eventStatus === 'on_sale'
                    ? 'bg-green-500/90'
                    : event.eventStatus === 'paused'
                      ? 'bg-yellow-500/90'
                      : 'bg-red-500/90',
                ]"
              >
                {{
                  event.eventStatus === 'on_sale'
                    ? 'On Sale'
                    : event.eventStatus === 'paused'
                      ? 'Paused'
                      : 'Sold Out'
                }}
              </span>
            </div>

            <!-- Price Badge -->
            <div class="absolute bottom-4 right-4">
              <div class="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <span class="text-xs text-slate-500">per ticket</span>
                <p class="text-xl font-bold text-purple-600">₦{{ event.price.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <!-- Event Info Card -->
          <white-card class="p-6 md:p-8">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">{{ event.title }}</h1>
                <p class="text-slate-500 mt-1">{{ event.category }}</p>
              </div>

              <!-- toggle fav button-->
              <button
                @click="toggleFavorite"
                class="p-2 rounded-full hover:bg-slate-100 transition"
                :class="isFavorite ? 'text-red-500' : 'text-slate-300'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                  />
                </svg>
              </button>
            </div>

            <!-- Event Meta Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div class="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"
                >
                  <!-- calender icon svg -->
                  <svg
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
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-400 uppercase tracking-wider font-medium">Date</p>
                  <p class="text-sm font-semibold text-slate-700">{{ event.date }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"
                >
                  <!-- clock icon svg -->
                  <svg
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-400 uppercase tracking-wider font-medium">Time</p>
                  <p class="text-sm font-semibold text-slate-700">{{ event.time }}</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-4 bg-slate-50 rounded-xl sm:col-span-2">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"
                >
                  <!-- location icon svg -->
                  <svg
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
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-slate-400 uppercase tracking-wider font-medium">
                    Location
                  </p>
                  <p class="text-sm font-semibold text-slate-700">{{ event.location }}</p>
                </div>
              </div>
            </div>

            <!-- Description (if available) -->
            <div v-if="event.description" class="mt-6 pt-6 border-t border-slate-100">
              <h3 class="text-sm font-semibold text-slate-700 mb-2">About this event</h3>
              <p class="text-sm text-slate-500 leading-relaxed">{{ event.description }}</p>
            </div>
          </white-card>
        </div>

        <!-- BUYER INFO -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold mb-4">Your Details</h2>

          <div class="space-y-3">
            <input v-model="buyer.fullName" type="text" placeholder="Full Name" class="input" />

            <input v-model="buyer.email" type="email" placeholder="Email Address" class="input" />

            <input v-model="buyer.phone" type="tel" placeholder="Phone Number" class="input" />
          </div>
        </div>

        <!-- RIGHT: Purchase Panel (2 columns) -->
        <div class="lg:col-span-2">
          <div class="lg:sticky lg:top-6">
            <white-card class="p-6 md:p-8 shadow-xl">
              <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <!-- ticket icon svg-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-purple-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>
                Order Summary
              </h2>

              <!-- Ticket Availability -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-slate-500">Available tickets</span>

                  <div class="inline-flex items-center gap-2">
                    <!-- ping indicator -->
                    <span
                      class="rounded-xl w-2 h-2 animate-ping"
                      :class="
                        event.ticketsLeft <= event.totalTickets / 2 ? 'bg-red-500' : 'bg-green-500'
                      "
                    ></span>

                    <!-- tickets indicator -->
                    <span
                      class="text-sm font-semibold"
                      :class="
                        event.ticketsLeft <= event.totalTickets / 2
                          ? 'text-red-500'
                          : 'text-green-600'
                      "
                    >
                      {{ event.ticketsLeft }} left
                    </span>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :class="getAvailabilityColor"
                    :style="{ width: availabilityPercentage + '%' }"
                  ></div>
                </div>

                <p
                  v-if="event.ticketsLeft <= event.totalTickets / 2"
                  class="text-xs text-red-500 mt-1 flex items-center gap-1"
                >
                  <!-- red alert svg-->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-3 h-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  Selling fast!
                </p>
              </div>

              <!-- Quantity Selector -->
              <div class="mb-6">
                <label class="block text-sm font-semibold text-slate-700 mb-3">Quantity</label>
                <div class="flex items-center gap-3">
                  <button
                    @click="decrementQuantity"
                    :disabled="quantity <= 1"
                    class="w-12 h-12 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-purple-500 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <!-- negative icon svg -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>

                  <!-- quantity box -->

                  <div class="flex-1">
                    <input
                      type="number"
                      min="1"
                      :max="event.ticketsLeft"
                      v-model.number="quantity"
                      class="w-full text-center py-3 text-xl font-bold text-slate-800 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      @input="validateQuantity"
                    />
                  </div>

                  <button
                    @click="incrementQuantity"
                    :disabled="quantity >= event.ticketsLeft"
                    class="w-12 h-12 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-600 hover:border-purple-500 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                  >
                    <!-- positive icon svg -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>

                <!-- quanity error alert -->
                <p v-if="quantityError" class="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-3 h-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  {{ quantityError }}
                </p>
              </div>

              <!-- Price Breakdown -->
              <div class="space-y-3 py-4 border-t border-b border-slate-100">
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500"
                    >{{ quantity }} × ₦{{ event.price.toLocaleString() }}</span
                  >
                  <span class="font-medium text-slate-700"
                    >₦{{ (quantity * event.price).toLocaleString() }}</span
                  >
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-slate-500">Service fee</span>
                  <span class="font-medium text-slate-700">₦{{ serviceFee.toLocaleString() }}</span>
                </div>
              </div>

              <!-- Total -->
              <div class="flex justify-between items-center py-4">
                <span class="text-sm font-semibold text-slate-600">Total</span>
                <span class="text-2xl font-bold text-purple-600"
                  >₦{{ grandTotal.toLocaleString() }}</span
                >
              </div>

              <!-- Error -->
              <div
                v-if="error"
                class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-4 h-4 text-red-500 mt-0.5 shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <p class="text-sm text-red-600">{{ error }}</p>
              </div>

              <!-- Buy Button -->
              <button
                @click="purchaseTickets"
                :disabled="
                  isSubmitting ||
                  quantity > event.ticketsLeft ||
                  quantity < 1 ||
                  event.eventStatus !== 'on_sale'
                "
                class="w-full py-4 bg-primary-gradient text-white rounded-xl font-semibold text-lg hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <span
                  v-if="isSubmitting"
                  class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                ></span>
                {{ isSubmitting ? 'Processing...' : 'Confirm Purchase' }}
              </button>

              <!-- Secure payment tag -->

              <p
                class="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-1"
              >
                <!-- padlock svg icon-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                Secure payment processing
              </p>
            </white-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  outline: none;
  transition: 0.2s;
}

.input:focus {
  border-color: #a855f7;
}
</style>

<script>
import { db } from '@/firebase'
import { doc, getDoc, serverTimestamp } from 'firebase/firestore'
export default {
  data() {
    return {
      event: null,
      isLoading: true,
      quantity: 1,
      error: null,
      quantityError: null,
      isSubmitting: false,
      isFavorite: false,

      buyer: {
        fullName: '',
        email: '',
        phone: '',
      },
    }
  },

  mounted() {
    this.fetchEvent()

    const user = this.$store.getters['auth/user']

    if (user) {
      this.buyer.fullName = user.fullName || ''
      this.buyer.email = user.email || ''
      this.buyer.phone = user.phone || ''
    }
  },

  computed: {
    eventId() {
      return this.$route.params.id
    },

    userId() {
      return this.$store.getters['auth/userId']
    },

    totalPrice() {
      if (!this.event) return 0
      return this.quantity * this.event.price
    },

    // NEW: Service fee calculation (e.g., 2.5%)
    serviceFee() {
      return Math.round(this.totalPrice * 0.025)
    },

    // NEW: Grand total with fee
    grandTotal() {
      return this.totalPrice + this.serviceFee
    },

    // NEW: Availability percentage for progress bar
    availabilityPercentage() {
      if (!this.event) return 0
      return (this.event.ticketsLeft / this.event.totalTickets) * 100
    },

    // NEW: Color based on availability
    getAvailabilityColor() {
      if (this.availabilityPercentage > 50) return 'bg-green-500'
      if (this.availabilityPercentage > 20) return 'bg-yellow-500'
      return 'bg-red-500'
    },
  },

  mounted() {
    this.fetchEvent()
  },

  methods: {
    async fetchEvent() {
      const snap = await getDoc(doc(db, 'events', this.eventId))

      if (!snap.exists()) return

      this.event = { id: snap.id, ...snap.data() }
      this.isLoading = false
    },

    // NEW: Increment quantity
    incrementQuantity() {
      if (this.quantity < this.event.ticketsLeft) {
        this.quantity++
        this.quantityError = null
      }
    },

    // NEW: Decrement quantity
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--
        this.quantityError = null
      }
    },

    // NEW: Validate quantity input
    validateQuantity() {
      if (this.quantity < 1) {
        this.quantity = 1
        this.quantityError = 'Minimum 1 ticket'
      } else if (this.quantity > this.event.ticketsLeft) {
        this.quantity = this.event.ticketsLeft
        this.quantityError = `Only ${this.event.ticketsLeft} tickets available`
      } else {
        this.quantityError = null
      }
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite
      // TODO: Save to user favorites in Firestore
    },

    async purchaseTickets() {
      this.error = null

      if (!this.userId) {
        this.error = 'Please log in to purchase tickets'
        this.$router.push('/auth?mode=login')
        return
      }

      if (this.quantity <= 0) {
        this.error = 'Please select at least 1 ticket'
        return
      }

      if (this.quantity > this.event.ticketsLeft) {
        this.error = `Only ${this.event.ticketsLeft} tickets remaining`
        return
      }

      if (!this.buyer.fullName || !this.buyer.email || !this.buyer.phone) {
        this.error = 'Please fill in your details'
        return
      }

      this.isSubmitting = true

      try {
        await this.$store.dispatch('client/purchaseTickets', {
          userId: this.userId,
          eventId: this.eventId,
          quantity: this.quantity,
          totalPrice: this.grandTotal,
          serviceFee: this.serviceFee,
          buyer: this.buyer,
          createdAt: serverTimestamp(),
        })

        // ✅ REDIRECT HERE (correct place)
        this.$router.push({
          path: '/events',
          query: { purchased: 'success' },
        })
      } catch (err) {
        throw new Error('Something went wrong . Please try again later')
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
