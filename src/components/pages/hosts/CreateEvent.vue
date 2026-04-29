<template>
  <div class="bg-secondary-gradient min-h-screen py-10 px-4 md:px-[10%]">
    <white-card>
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gradient">Create New Event</h1>
        <p class="text-sm text-slate-500 mt-1">
          Fill in the form below to create and publish your event
        </p>
      </div>

      <form @submit.prevent="openConfirm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- TITLE -->
          <div class="md:col-span-2">
            <label class="form-label">Event Title</label>
            <input v-model="title" type="text" class="form-input" @input="validateField('title')" />
            <p v-if="errors.title" class="error">{{ errors.title }}</p>
          </div>

          <!-- CATEGORY -->
          <div>
            <label class="form-label">Category</label>
            <select v-model="category" class="form-input" @change="validateField('category')">
              <option disabled value="">Select category</option>
              <option v-for="cat in categories" :key="cat">{{ cat }}</option>
            </select>
            <p v-if="errors.category" class="error">{{ errors.category }}</p>
          </div>

          <!-- LOCATION -->
          <div>
            <label class="form-label">Location</label>
            <input
              v-model="location"
              type="text"
              class="form-input"
              @input="validateField('location')"
            />
            <p v-if="errors.location" class="error">{{ errors.location }}</p>
          </div>

          <!-- DATE -->
          <div>
            <label class="form-label"
              >Date <span class="text-slate-400 font-normal">(optional)</span></label
            >
            <input
              v-model="date"
              type="date"
              :min="minDate"
              class="form-input"
              @change="validateField('date')"
            />
            <p v-if="errors.date" class="error">{{ errors.date }}</p>
          </div>

          <!-- TIME -->
          <div>
            <label class="form-label"
              >Time <span class="text-slate-400 font-normal">(optional)</span></label
            >
            <input
              v-model="time"
              type="time"
              :min="minTimeForSelectedDate"
              class="form-input"
              @change="validateField('time')"
            />
            <p v-if="errors.time" class="error">{{ errors.time }}</p>
          </div>

          <!-- PRICE -->
          <div>
            <label class="form-label">Price (₦)</label>
            <input
              v-model.number="price"
              type="number"
              min="1"
              class="form-input"
              @input="validateField('price')"
            />
            <p v-if="errors.price" class="error">{{ errors.price }}</p>
          </div>

          <!-- TICKETS -->
          <div>
            <label class="form-label">Total Tickets</label>
            <input
              v-model.number="totalTickets"
              type="number"
              min="1"
              class="form-input"
              @input="validateField('totalTickets')"
            />
            <p v-if="errors.totalTickets" class="error">{{ errors.totalTickets }}</p>
          </div>

          <!-- FEATURED -->
          <div class="md:col-span-2 flex items-center space-x-3">
            <input type="checkbox" v-model="featured" class="w-4 h-4" />
            <label class="text-sm text-slate-600">Add to Featured Events</label>
          </div>

          <!-- IMAGE UPLOAD -->
          <div class="md:col-span-2">
            <label class="form-label">Event Image</label>

            <input type="file" @change="handleImageUpload" accept="image/*" />

            <p v-if="errors.image" class="error">{{ errors.image }}</p>

            <!-- PREVIEW -->
            <div v-if="imagePreview" class="mt-4">
              <img :src="imagePreview" class="w-full max-h-60 object-cover rounded-lg shadow" />
            </div>
          </div>
        </div>

        <!-- SUBMIT -->
        <div class="mt-8">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 rounded-lg text-white bg-primary-gradient disabled:opacity-50 hover:scale-[1.01] transition"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Event 🚀' }}
          </button>
        </div>
      </form>
    </white-card>

    <!-- CONFIRM MODAL -->
    <confirm-modal
      v-if="showConfirm"
      title="Confirm Event Creation"
      message="Are you sure you want to create and publish this event?"
      confirm-text="Publish"
      cancel-text="Review"
      @confirm="handleSubmit"
      @cancel="showConfirm = false"
    />

    <!-- LOADING OVERLAY -->
    <div
      v-if="isSubmitting"
      class="fixed inset-0 bg-white/70 flex flex-col items-center justify-center z-50"
    >
      <div
        class="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"
      ></div>
      <p class="mt-3 text-sm text-slate-600">Creating event...</p>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-slate-600 mb-2;
}

.form-input {
  @apply w-full border rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:border-purple-500;
}

.error {
  @apply text-red-500 text-xs mt-1;
}
</style>

<script>
import { storage, db } from '@/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default {
  data() {
    return {
      title: '',
      category: '',
      location: '',
      date: '',
      time: '',
      price: null,
      totalTickets: null,
      featured: false,

      imageFile: null,
      imagePreview: null,

      errors: {},
      isSubmitting: false,
      showConfirm: false,
    }
  },

  computed: {
    categories() {
      return this.$store.getters['events/allCategories']
    },

    userId() {
      return this.$store.getters['auth/userId']
    },

    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },

    minTimeForSelectedDate() {
      if (!this.date) return null

      const selectedDate = new Date(this.date)
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      if (selectedDate.getTime() === today.getTime()) {
        const hours = now.getHours().toString().padStart(2, '0')
        const minutes = now.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
      }

      return null
    },
  },

  methods: {
    handleImageUpload(e) {
      const file = e.target.files[0]
      if (!file) return

      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)

      // Clear image error if exists
      if (this.errors.image) {
        delete this.errors.image
      }
    },

    toSentenceCase(text) {
      if (!text) return ''
      return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    },

    formatTimeTo12Hr(time) {
      if (!time) return ''
      const [hour, minute] = time.split(':')
      let h = parseInt(hour)
      const ampm = h >= 12 ? 'PM' : 'AM'
      h = h % 12 || 12
      return `${h}:${minute} ${ampm}`
    },

    formatDate(date) {
      if (!date) return ''
      const d = new Date(date)
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    },

    validateForm() {
      this.errors = {}

      if (!this.title) this.errors.title = 'Event title is required'
      if (!this.category) this.errors.category = 'Category is required'
      if (!this.location) this.errors.location = 'Location is required'

      if (!this.price || this.price <= 0) {
        this.errors.price = 'Price must be greater than 0'
      }

      if (!this.totalTickets || this.totalTickets <= 0) {
        this.errors.totalTickets = 'Tickets must be greater than 0'
      }

      if (!this.imageFile) {
        this.errors.image = 'Event image is required'
      }

      // Date validation — only if user entered a value
      if (this.date) {
        const selectedDate = new Date(this.date)
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        if (selectedDate < today) {
          this.errors.date = 'Date cannot be in the past'
        }
      }

      // Time validation — only if user entered a value
      if (this.time) {
        if (!this.date) {
          this.errors.date = 'Please select a date first'
        } else {
          const selectedDateTime = new Date(`${this.date}T${this.time}`)
          const now = new Date()

          if (selectedDateTime <= now) {
            this.errors.time = 'Time must be later than the current time'
          }
        }
      }

      return Object.keys(this.errors).length === 0
    },

    validateField(field) {
      if (this.errors[field]) {
        delete this.errors[field]
      }

      if (field === 'date') {
        delete this.errors.time
      }
      if (field === 'time') {
        if (this.errors.date === 'Please select a date first') {
          delete this.errors.date
        }
      }
    },

    openConfirm() {
      if (!this.validateForm()) return
      this.showConfirm = true
    },

    async handleSubmit() {
      this.showConfirm = false
      this.isSubmitting = true

      try {
        const userId = this.$store.getters['auth/userId']

        if (!userId) {
          throw new Error('User not authenticated')
        }

        // Format data
        const formattedTitle = this.toSentenceCase(this.title)
        const formattedLocation = this.toSentenceCase(this.location)
        const formattedCategory = this.toSentenceCase(this.category)
        const formattedDate = this.formatDate(this.date)
        const formattedTime = this.formatTimeTo12Hr(this.time)

        // Upload image
        const fileName = `${Date.now()}_${this.imageFile.name}`
        const storageRef = ref(storage, `events/${userId}/${fileName}`)

        await uploadBytes(storageRef, this.imageFile)
        const imageUrl = await getDownloadURL(storageRef)

        // Save to Firestore
        await addDoc(collection(db, 'events'), {
          title: formattedTitle,
          category: formattedCategory,
          location: formattedLocation,
          date: formattedDate,
          time: formattedTime,

          price: Number(this.price),
          totalTickets: Number(this.totalTickets),
          ticketsLeft: Number(this.totalTickets),

          attendees: 0,
          saleStatus: 'OnSale',
          eventStatus: 'on_sale',
          featured: this.featured,

          image: imageUrl,
          hostId: userId,

          createdAt: serverTimestamp(),
        })

        this.$router.push('/host/dashboard')
      } catch (err) {
        console.error(err)
        alert(err.message)
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>
