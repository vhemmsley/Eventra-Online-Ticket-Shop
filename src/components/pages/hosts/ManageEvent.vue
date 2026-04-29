<template>
  <div class="min-h-screen bg-secondary-gradient px-[5%] py-10">
    <!-- LOADING -->
    <div v-if="isLoading" class="space-y-4 animate-pulse">
      <div class="h-10 w-1/3 bg-slate-200 rounded"></div>
      <div class="h-72 bg-slate-200 rounded-xl"></div>
    </div>

    <!-- NOT FOUND -->
    <div v-else-if="!event" class="text-center py-20">
      <h2 class="text-2xl font-bold">Event not found</h2>
    </div>

    <!-- FORM -->
    <white-card v-else class="space-y-10 relative">
      <!-- HEADER -->
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-semibold text-gradient">Manage Event</h1>
          <p class="text-sm text-slate-500">Update your event details and settings</p>
        </div>

        <button
          @click="deleteEvent"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete Event
        </button>
      </div>

      <!-- IMAGE -->
      <section class="space-y-3">
        <h2 class="text-lg font-semibold">Event Image</h2>

        <div class="flex flex-col md:flex-row gap-6 items-center">
          <img
            :src="previewImage || eventData.image"
            class="w-full md:w-64 h-40 object-cover rounded-xl border"
          />

          <div class="w-full space-y-2">
            <input type="file" accept="image/*" @change="handleImageUpload" />
            <p class="text-xs text-slate-400">Upload a new image to replace current banner</p>
          </div>
        </div>
      </section>

      <!-- BASIC INFO -->
      <section class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="label">Event Title</label>
          <input v-model="eventData.title" class="input" @input="validateField('title')" />
          <p v-if="errors.title" class="error">{{ errors.title }}</p>
        </div>

        <div>
          <label class="label">Category</label>
          <select v-model="eventData.category" class="input">
            <option v-for="c in categories" :key="c">{{ c }}</option>
          </select>
        </div>

        <div>
          <label class="label">Location</label>
          <input v-model="eventData.location" class="input" @input="validateField('location')" />
          <p v-if="errors.location" class="error">{{ errors.location }}</p>
        </div>
      </section>

      <!-- SCHEDULE -->
      <section class="grid md:grid-cols-2 gap-6">
        <!-- DATE -->
        <div>
          <label class="label"
            >Date <span class="text-slate-400 font-normal">(optional)</span></label
          >
          <p class="text-xs text-slate-500 mb-1">Current: {{ event.date }}</p>
          <input
            type="date"
            v-model="eventData.date"
            :min="minDate"
            class="input"
            @change="validateField('date')"
          />
          <p v-if="errors.date" class="error">{{ errors.date }}</p>
        </div>

        <!-- TIME -->
        <div>
          <label class="label"
            >Time <span class="text-slate-400 font-normal">(optional)</span></label
          >
          <p class="text-xs text-slate-500 mb-1">Current: {{ event.time }}</p>
          <input
            type="time"
            v-model="eventData.time"
            :min="minTimeForSelectedDate"
            class="input"
            @change="validateField('time')"
          />
          <p v-if="errors.time" class="error">{{ errors.time }}</p>
        </div>
      </section>

      <!-- PRICING -->
      <section class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="label">Price (₦)</label>
          <input
            type="number"
            min="1"
            step="1"
            v-model.number="eventData.price"
            class="input"
            @input="validateField('price')"
          />
          <p v-if="errors.price" class="error">{{ errors.price }}</p>
        </div>

        <div>
          <label class="label">Total Tickets</label>
          <input
            type="number"
            min="1"
            step="1"
            v-model.number="eventData.totalTickets"
            class="input"
            @input="validateField('totalTickets')"
          />
          <p v-if="errors.totalTickets" class="error">
            {{ errors.totalTickets }}
          </p>
        </div>
      </section>

      <!-- STATUS -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Event Controls</h2>

        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="label">Status</label>
            <select v-model="eventData.eventStatus" class="input">
              <option value="on_sale">Active</option>
              <option value="paused">Paused</option>
              <option value="sold_out">Sold Out</option>
            </select>
          </div>

          <div class="flex items-center gap-2 mt-6">
            <input type="checkbox" v-model="eventData.featured" />
            <span class="text-sm">Featured Event</span>
          </div>
        </div>
      </section>

      <!-- ACTIONS -->
      <div class="flex flex-col md:flex-row gap-4 pt-6">
        <button
          @click="openConfirm"
          class="flex-1 py-3 bg-primary-gradient text-white rounded-xl hover:scale-[1.02] transition"
        >
          Save Changes
        </button>

        <button @click="resetChanges" class="flex-1 py-3 border rounded-xl hover:bg-slate-50">
          Reset
        </button>
      </div>

      <!-- CONFIRM MODAL -->
      <confirm-modal
        v-if="showConfirm"
        title="Confirm Update"
        message="Are you sure you want to update this event?"
        confirm-text="Confirm"
        cancel-text="Cancel"
        @confirm="updateEvent"
        @cancel="showConfirm = false"
      />

      <!-- LOADING OVERLAY -->
      <div
        v-if="isSubmitting"
        class="absolute inset-0 bg-white/70 flex flex-col items-center justify-center"
      >
        <div
          class="animate-spin h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full"
        ></div>
        <p class="mt-3 text-sm text-slate-600">Updating event...</p>
      </div>
    </white-card>
  </div>
</template>

<style scoped>
.label {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  outline: none;
}

.input:focus {
  border-color: #a855f7;
}

.error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}
</style>

<script>
import { db, storage } from '@/firebase'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  data() {
    return {
      event: null,
      eventData: {},
      isLoading: true,
      previewImage: null,
      uploadedFile: null,

      isSubmitting: false,
      showConfirm: false,

      errors: {},
    }
  },

  computed: {
    eventId() {
      return this.$route.params.id
    },

    userId() {
      return this.$store.getters['auth/userId']
    },

    categories() {
      return this.$store.getters['events/allCategories']
    },

    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },

    minTimeForSelectedDate() {
      if (!this.eventData.date) return null

      const selectedDate = new Date(this.eventData.date)
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

  async mounted() {
    await this.fetchEvent()
  },

  methods: {
    async fetchEvent() {
      this.isLoading = true

      const snap = await getDoc(doc(db, 'events', this.eventId))

      if (!snap.exists()) {
        this.event = null
        this.isLoading = false
        return
      }

      const data = snap.data()

      if (data.hostId !== this.userId) {
        alert('Not allowed')
        this.$router.push('/host/dashboard')
        return
      }

      this.event = data
      this.eventData = { ...data }
      this.isLoading = false
    },

    toSentenceCase(str) {
      if (!str) return ''
      return str
        .toLowerCase()
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    },

    formatDate(dateStr) {
      if (!dateStr) return this.event.date
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },

    formatTime(timeStr) {
      if (!timeStr) return this.event.time
      const [hour, minute] = timeStr.split(':')
      let h = parseInt(hour)

      const suffix = h >= 12 ? 'PM' : 'AM'
      if (h > 12) h -= 12
      if (h === 0) h = 12

      return `${h.toString().padStart(2, '0')}:${minute} ${suffix}`
    },

    validate() {
      this.errors = {}

      if (!this.eventData.title) this.errors.title = 'Title is required'
      if (!this.eventData.location) this.errors.location = 'Location is required'
      if (this.eventData.price < 0) this.errors.price = 'Price cannot be negative'
      if (this.eventData.totalTickets < 1) this.errors.totalTickets = 'Tickets must be at least 1'

      // Date validation — only if user entered a value
      if (this.eventData.date) {
        const selectedDate = new Date(this.eventData.date)
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        if (selectedDate < today) {
          this.errors.date = 'Date cannot be in the past'
        }
      }

      // Time validation — only if user entered BOTH date and time
      if (this.eventData.time) {
        if (!this.eventData.date) {
          this.errors.date = 'Please select a date first'
        } else {
          const selectedDateTime = new Date(`${this.eventData.date}T${this.eventData.time}`)
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

    handleImageUpload(e) {
      const file = e.target.files[0]
      if (!file) return

      this.previewImage = URL.createObjectURL(file)
      this.uploadedFile = file
    },

    async uploadImage() {
      if (!this.uploadedFile) return this.eventData.image

      const fileRef = storageRef(storage, `events/${this.eventId}/${Date.now()}`)

      await uploadBytes(fileRef, this.uploadedFile)

      return await getDownloadURL(fileRef)
    },

    openConfirm() {
      if (!this.validate()) return
      this.showConfirm = true
    },

    async updateEvent() {
      this.isSubmitting = true
      this.showConfirm = false

      try {
        const imageUrl = await this.uploadImage()

        const payload = {
          ...this.eventData,

          title: this.toSentenceCase(this.eventData.title),
          location: this.toSentenceCase(this.eventData.location),

          date: this.formatDate(this.eventData.date),
          time: this.formatTime(this.eventData.time),

          price: Number(this.eventData.price),
          totalTickets: Number(this.eventData.totalTickets),

          image: imageUrl,
        }

        await updateDoc(doc(db, 'events', this.eventId), payload)

        setTimeout(() => {
          this.$router.push('/host/dashboard')
        }, 1000)
      } catch (err) {
        console.error(err)
      } finally {
        this.isSubmitting = false
      }
    },

    async deleteEvent() {
      if (!confirm('Delete this event?')) return

      await deleteDoc(doc(db, 'events', this.eventId))
      this.$router.push('/host/dashboard')
    },

    resetChanges() {
      this.eventData = { ...this.event }
      this.previewImage = null
      this.errors = {}
    },
  },
}
</script>
