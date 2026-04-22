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

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- TITLE -->
          <div class="md:col-span-2">
            <label class="form-label">Event Title</label>
            <input v-model="title" type="text" class="form-input" />
            <p v-if="errors.title" class="error">{{ errors.title }}</p>
          </div>

          <!-- CATEGORY -->
          <div>
            <label class="form-label">Category</label>
            <select v-model="category" class="form-input">
              <option disabled value="">Select category</option>
              <option v-for="cat in categories" :key="cat">{{ cat }}</option>
            </select>
            <p v-if="errors.category" class="error">{{ errors.category }}</p>
          </div>

          <!-- LOCATION -->
          <div>
            <label class="form-label">Location</label>
            <input v-model="location" type="text" class="form-input" />
            <p v-if="errors.location" class="error">{{ errors.location }}</p>
          </div>

          <!-- DATE -->
          <div>
            <label class="form-label">Date</label>
            <input v-model="date" type="date" class="form-input" />
          </div>

          <!-- TIME -->
          <div>
            <label class="form-label">Time</label>
            <input v-model="time" type="time" class="form-input" />
          </div>

          <!-- PRICE -->
          <div>
            <label class="form-label">Price (₦)</label>
            <input v-model.number="price" type="number" min="1" class="form-input" />
            <p v-if="errors.price" class="error">{{ errors.price }}</p>
          </div>

          <!-- TICKETS -->
          <div>
            <label class="form-label">Total Tickets</label>
            <input v-model.number="totalTickets" type="number" min="1" class="form-input" />
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
            class="w-full py-3 rounded-lg text-white bg-primary-gradient disabled:opacity-50"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Event 🚀' }}
          </button>
        </div>
      </form>
    </white-card>
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
// importing firebase firestore storAge  to save the event image and data
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
    }
  },
  created() {
    // fetch categories if not already loaded
    console.log(this.$store.getters['auth/userId'])
  },
  computed: {
    categories() {
      return this.$store.getters['events/allCategories']
    },

    userId() {
      return this.$store.getters['auth/userId']
    },
  },

  methods: {
    handleImageUpload(e) {
      const file = e.target.files[0]

      if (!file) return

      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)
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

      return Object.keys(this.errors).length === 0
    },

    async handleSubmit() {
      alert('please confirmm event details before submission')

      if (!this.validateForm()) return

      this.isSubmitting = true

      try {
        const userId = this.$store.getters['auth/userId']

        if (!userId) {
          throw new Error('User not authenticated')
        }

        // 🔥 FORMAT DATA
        const formattedTitle = this.toSentenceCase(this.title)
        const formattedLocation = this.toSentenceCase(this.location)
        const formattedCategory = this.toSentenceCase(this.category)
        const formattedDate = this.formatDate(this.date)
        const formattedTime = this.formatTimeTo12Hr(this.time)

        // 🔥 Upload image
        const fileName = `${Date.now()}_${this.imageFile.name}`
        const storageRef = ref(storage, `events/${userId}/${fileName}`)

        await uploadBytes(storageRef, this.imageFile)
        const imageUrl = await getDownloadURL(storageRef)

        // 🔥 Save to Firestore
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
          saleStatus: 'On Sale',
          eventStatus: 'active',
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
