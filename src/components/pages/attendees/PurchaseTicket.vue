<template>
  <div class="min-h-screen bg-hero-gradient px-4 md:px-[5%] py-6 md:py-12">
    <!-- LOADING -->
    <div v-if="isLoading" class="max-w-6xl mx-auto animate-pulse">
      <div class="h-96 bg-slate-200 rounded-2xl"></div>
    </div>

    <!-- MAIN -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Back Button -->
      <button
        @click="$router.back()"
        class="mb-6 flex items-center gap-2 text-slate-900 hover:text-purple-600 transition group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="2" stroke="currentColor"
          class="w-5 h-5 group-hover:-translate-x-1 transition-transform">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span class="text-sm font-medium">Back to Events</span>
      </button>

      <!-- FLEX LAYOUT -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

        <!-- LEFT -->
        <div class="w-full lg:flex-[3] space-y-6">

          <!-- Hero -->
          <div class="relative rounded-2xl overflow-hidden shadow-lg group">
            <img :src="event.image"
              class="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="event.title" />

            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <!-- Status -->
            <div class="absolute top-4 left-4">
              <span
                :class="[
                  'px-4 py-1.5 text-white text-xs font-semibold rounded-full backdrop-blur-sm',
                  event.eventStatus === 'on_sale'
                    ? 'bg-green-500/90'
                    : event.eventStatus === 'paused'
                    ? 'bg-yellow-500/90'
                    : 'bg-red-500/90',
                ]">
                {{
                  event.eventStatus === 'on_sale'
                    ? 'On Sale'
                    : event.eventStatus === 'paused'
                    ? 'Paused'
                    : 'Sold Out'
                }}
              </span>
            </div>

            <!-- Price -->
            <div class="absolute bottom-4 right-4">
              <div class="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                <span class="text-xs text-slate-500">per ticket</span>
                <p class="text-xl font-bold text-purple-600">
                  ₦{{ event.price.toLocaleString() }}
                </p>
              </div>
            </div>
          </div>

          <!-- Event Info -->
          <white-card class="p-6 md:p-8 space-y-6">
            <div class="flex items-start justify-between">
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-slate-800">
                  {{ event.title }}
                </h1>
                <p class="text-slate-500 mt-1">{{ event.category }}</p>
              </div>

              <button
                @click="toggleFavorite"
                class="p-2 rounded-full hover:bg-slate-100 transition"
                :class="isFavorite ? 'text-red-500' : 'text-slate-300'">
                ❤️
              </button>
            </div>

            <!-- META FLEX -->
            <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <div class="flex-1 flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  📅
                </div>
                <div>
                  <p class="text-xs text-slate-400 uppercase">Date</p>
                  <p class="text-sm font-semibold text-slate-700">{{ event.date }}</p>
                </div>
              </div>

              <div class="flex-1 flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  ⏰
                </div>
                <div>
                  <p class="text-xs text-slate-400 uppercase">Time</p>
                  <p class="text-sm font-semibold text-slate-700">{{ event.time }}</p>
                </div>
              </div>

              <div class="w-full flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  📍
                </div>
                <div>
                  <p class="text-xs text-slate-400 uppercase">Location</p>
                  <p class="text-sm font-semibold text-slate-700">{{ event.location }}</p>
                </div>
              </div>
            </div>

            <div v-if="event.description" class="pt-6 border-t border-slate-100">
              <h3 class="text-sm font-semibold mb-2">About this event</h3>
              <p class="text-sm text-slate-500 leading-relaxed">
                {{ event.description }}
              </p>
            </div>
          </white-card>

          <!-- Buyer -->
          <white-card class="p-6 md:p-8 space-y-4">
            <h2 class="text-lg font-semibold">Your Details</h2>
            <input v-model="buyer.fullName" type="text" placeholder="Full Name" class="input" />
            <input v-model="buyer.email" type="email" placeholder="Email Address" class="input" />
            <input v-model="buyer.phone" type="tel" placeholder="Phone Number" class="input" />
          </white-card>
        </div>

        <!-- RIGHT -->
        <div class="w-full lg:flex-[2]">
          <div class="sticky top-6">
            <white-card class="p-6 md:p-8 shadow-xl space-y-6">

              <h2 class="text-xl font-bold">Order Summary</h2>

              <!-- Tickets -->
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span>Available tickets</span>
                  <span class="font-semibold">
                    {{ event.ticketsLeft }} left
                  </span>
                </div>

                <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    :class="getAvailabilityColor"
                    :style="{ width: availabilityPercentage + '%' }">
                  </div>
                </div>
              </div>

              <!-- Quantity -->
              <div>
                <label class="text-sm font-semibold mb-2 block">Quantity</label>
                <input
                  type="number"
                  v-model.number="quantity"
                  class="w-full text-center py-3 border-2 rounded-xl" />
              </div>

              <!-- Total -->
              <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{{ grandTotal.toLocaleString() }}</span>
              </div>

              <!-- Button -->
              <button
                @click="purchaseTickets"
                class="w-full py-4 bg-primary-gradient text-white rounded-xl font-semibold">
                Confirm Purchase
              </button>

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
'''
