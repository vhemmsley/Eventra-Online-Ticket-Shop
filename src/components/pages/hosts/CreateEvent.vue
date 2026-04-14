span
<template>
  <div class="bg-secondary-gradient min-h-screen py-10 px-[2%] md:py-6 md:px-[12%]">
    <white-card>
      <!-- header -->
      <h1 class="text-3xl font-semibold text-gradient mb-2">Create New Event</h1>
      <p class="text-sm text-slate-500 mb-4">
        Fill in the form below to create and publish your new event
      </p>

      <form @submit.prevent="handleSubmit()">
        <!-- form grid-->
        <div class="mt-8 space-y-4">
          <!-- event title  -->
          <div class="flex items-center space-x-5">
            <label class="text-lg text-slate-600">Event Title</label>
            <div
              class="w-[80%] flex items-center border rounded-lg p-3 md:p-2 focus-within:border-purple-500 shadow-sm"
            >
              <input
                v-model="title"
                type="text"
                placeholder="e.g Tech Fest 2025"
                class="w-full outline-none text-sm"
              />
            </div>
          </div>

          <!-- category and location -->
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0"
          >
            <!-- category -->
            <div class="flex items-center space-x-8">
              <label class="text-lg text-slate-600">Category</label>
              <select
                v-model="selectedLocation"
                class="border shadow-sm overflow-none text-sm rounded-lg p-3 md:p-2 w-72 placeholder:text-md hover:border-purple-400 outline-purple-500"
              >
                <option disabled value="">Select category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- location-->
            <div class="flex items-center justify-center space-x-8">
              <label class="text-lg text-slate-600">Location</label>
              <div
                class="w-72 flex items-center border rounded-lg p-3 md:p-2 focus-within:border-purple-500 shadow-sm"
              >
                <span class="mr-2 text-slate-400">📍</span>
                <input
                  v-model="title"
                  type="text"
                  placeholder="e.g Lagos, Nigeria"
                  class="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Date and Time -->
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0"
          >
            <!-- date -->
            <div class="flex items-center justify-between space-x-16">
              <label class="text-lg text-slate-600">Date</label>
              <div
                class="flex w-72 items-center border rounded-lg p-3 md:p-2 focus-within:border-purple-500 shadow-sm transition"
              >
                <span class="mr-2 text-slate-400">📅</span>
                <input
                  v-model="date"
                  type="date"
                  class="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>

            <!-- TIME -->
            <div class="flex items-center justify-between space-x-16">
              <label class="text-lg text-slate-600">Time</label>
              <div
                class="flex w-72 items-center border rounded-lg p-3 md:p-2 focus-within:border-purple-500 shadow-sm transition"
              >
                <span class="mr-2 text-slate-400">⏰</span>
                <input
                  v-model="time"
                  type="time"
                  class="w-full outline-none text-sm bg-transparent"
                />
              </div>
            </div>
          </div>

          <!-- price and total tickets -->
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0"
          >
            <!-- price -->
            <div class="flex items-center justify-center space-x-16">
              <label class="text-lg text-slate-600">Price</label>
              <div
                class="w-72 flex items-center border rounded-lg p-3 md:p-2 focus-within:border-purple-500 shadow-sm"
              >
                <input
                  v-model="title"
                  type="text"
                  placeholder="e.g ₦5000"
                  class="w-full outline-none text-sm"
                />
              </div>
            </div>

            <!-- total tickets -->
            <div class="flex items-center justify-center space-x-1 md:space-x-4">
              <label class="text-md text-slate-600">No Of Tickets</label>
              <div
                class="w-72 flex items-center border rounded-lg p-3 md:p-2 focus-within:border-purple-500 shadow-sm"
              >
                <input
                  v-model="title"
                  type="text"
                  placeholder="e.g 500"
                  class="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </white-card>
  </div>
</template>

<script>
export default {
  name: 'CreateEvent',

  data() {
    return {
      title: '',
    }
  },

  computed: {
    categories() {
      return this.$store.getters['events/allCategories']
    },
  },
}
</script>
