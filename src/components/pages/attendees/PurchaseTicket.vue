  <div class="min-h-screen bg-hero-gradient px-4 md:px-[5%] py-6 md:py-12">

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
