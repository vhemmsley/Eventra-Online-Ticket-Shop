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
        <!-- GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- TITLE -->
          <div class="md:col-span-2">
            <label class="form-label">Event Title</label>
            <input
              v-model="title"
              type="text"
              placeholder="e.g Tech Fest 2026"
              class="form-input"
            />
          </div>

          <!-- CATEGORY -->
          <div>
            <label class="form-label">Category</label>
            <select v-model="category" class="form-input">
              <option disabled value="">Select category</option>
              <option v-for="cat in categories" :key="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <!-- LOCATION -->
          <div>
            <label class="form-label">Location</label>
            <input
              v-model="location"
              type="text"
              placeholder="e.g Lagos, Nigeria"
              class="form-input"
            />
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
            <input v-model="price" type="number" placeholder="5000" class="form-input" />
          </div>

          <!-- TICKETS -->
          <div>
            <label class="form-label">Total Tickets</label>
            <input v-model="totalTickets" type="number" placeholder="500" class="form-input" />
          </div>
        </div>

        <!-- SUBMIT -->
        <div class="mt-8">
          <button
            type="submit"
            class="w-full py-3 rounded-lg text-white bg-primary-gradient hover:scale-[1.02] transition duration-200 shadow-md hover:shadow-xl"
          >
            Create Event 🚀
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
  @apply w-full border rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:border-purple-500 transition;
}
</style>

<script>
export default {
  name: 'CreateEvent',

  data() {
    return {
      title: '',
      category: '',
      location: '',
      date: '',
      time: '',
      price: '',
      totalTickets: '',
    }
  },

  computed: {
    categories() {
      return this.$store.getters['events/allCategories']
    },
  },

  methods: {
    handleSubmit() {
      console.log({
        title: this.title,
        category: this.category,
        location: this.location,
        date: this.date,
        time: this.time,
        price: this.price,
        totalTickets: this.totalTickets,
      })
    },
  },
}
</script>
