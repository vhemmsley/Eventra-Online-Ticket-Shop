<template>
  <div class="min-h-screen bg-secondary-gradient px-4 md:px-[8%] py-8">
    <!-- CONFIRM DELETE MODAL -->
    <confirm-modal
      v-if="showConfirm"
      title="Confirm Delete Event"
      message="Are you sure you want to delete this event? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="deleteEvent"
      @cancel="showConfirm = false"
    />

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 class="text-3xl md:text-4xl font-semibold text-gradient">Host Dashboard 🎉</h1>
        <p class="text-slate-500 mt-2">Manage your events and track performance</p>
      </div>

      <router-link
        to="/host/create-event"
        class="mt-4 md:mt-0 px-6 py-3 bg-primary-gradient text-white rounded-xl shadow-md hover:scale-105 transition"
      >
        + Create Event
      </router-link>
    </div>

    <!-- STATS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white rounded-xl p-6 shadow">
        <p class="text-slate-500 text-sm">Total Events</p>
        <h2 class="text-2xl font-bold mt-2">{{ totalEvents }}</h2>
      </div>

      <div class="bg-white rounded-xl p-6 shadow">
        <p class="text-slate-500 text-sm">Active Events</p>
        <h2 class="text-2xl font-bold mt-2 text-green-500">
          {{ activeEvents }}
        </h2>
      </div>

      <div class="bg-white rounded-xl p-6 shadow">
        <p class="text-slate-500 text-sm">Tickets Sold</p>
        <h2 class="text-2xl font-bold mt-2 text-purple-600">
          {{ totalTicketsSold }}
        </h2>
      </div>
    </div>

    <!-- EVENTS SECTION -->
    <div class="bg-white rounded-2xl shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Your Events</h2>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="py-10 flex justify-center">
        <base-spinner />
      </div>

      <!-- EMPTY STATE -->
      <div v-else-if="hostEvents.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">🎭</div>
        <p class="text-lg font-semibold">No events yet</p>
        <p class="text-sm text-slate-400 mt-2">Create your first event to get started</p>

        <router-link
          to="/host/create-event"
          class="inline-block mt-6 px-6 py-3 bg-primary-gradient text-white rounded-xl"
        >
          Create Event
        </router-link>
      </div>

      <!-- EVENTS LIST -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in hostEvents"
          :key="event.id"
          class="border rounded-xl overflow-hidden hover:shadow-lg transition"
        >
          <!-- IMAGE -->
          <div class="relative h-[180px] overflow-hidden">
            <img :src="event.image" class="w-full h-full object-cover" />

            <!-- STATUS -->
            <div class="absolute top-3 left-3">
              <span
                v-if="event.featured"
                class="px-3 py-1 text-white mr-2 text-xs bg-primary-gradient rounded-full"
                >Featured</span
              >
              <span
                :class="[
                  'px-3 py-1 text-white text-xs rounded-full',
                  event.eventStatus === 'on_sale'
                    ? 'bg-green-500'
                    : event.eventStatus === 'paused'
                      ? 'bg-yellow-500'
                      : 'bg-red-500',
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
          </div>

          <!-- DETAILS -->
          <div class="p-4 space-y-2">
            <h3 class="font-semibold text-lg">{{ event.title }}</h3>
            <p class="text-sm text-slate-500">{{ event.date }} • {{ event.time }}</p>

            <p class="text-sm text-slate-500">📍 {{ event.location }}</p>

            <!-- PROGRESS -->
            <div class="mt-2">
              <div class="flex justify-between text-xs mb-1">
                <span>{{ event.ticketsLeft }} left</span>
                <span>
                  {{
                    Math.round(
                      ((event.totalTickets - event.ticketsLeft) / event.totalTickets) * 100,
                    )
                  }}% sold
                </span>
              </div>

              <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary-gradient"
                  :style="{
                    width:
                      ((event.totalTickets - event.ticketsLeft) / event.totalTickets) * 100 + '%',
                  }"
                ></div>
              </div>
            </div>

            <!-- ACTIONS -->
            <div class="flex gap-3 mt-4">
              <router-link
                :to="`/host/manage-event/${event.id}`"
                class="flex-1 text-center py-2 text-sm border rounded-lg hover:bg-slate-100"
              >
                Manage
              </router-link>

              <button
                @click="openConfirm(event.id)"
                class="flex-1 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HostDashboard',

  data() {
    return {
      showConfirm: false,
      eventIdToDelete: null, // ✅ Store which event to delete
    }
  },

  computed: {
    hostEvents() {
      return this.$store.state.events.hostEvents
    },

    isLoading() {
      return this.$store.state.events.isLoading
    },

    totalEvents() {
      return this.hostEvents ? this.hostEvents.length : 0
    },

    activeEvents() {
      return this.hostEvents?.filter((e) => e.eventStatus === 'active')?.length || 0
    },

    totalTicketsSold() {
      return (
        this.hostEvents?.reduce((sum, e) => {
          return sum + (e.totalTickets - e.ticketsLeft)
        }, 0) || 0
      )
    },
  },

  mounted() {
    this.$store.dispatch('events/fetchHostEvents')
  },

  methods: {
    // ✅ Fixed: Accept event ID and store it
    openConfirm(eventId) {
      this.eventIdToDelete = eventId
      this.showConfirm = true
    },

    // ✅ Fixed: Use stored ID, no parameter needed from modal
    async deleteEvent() {
      if (!this.eventIdToDelete) return

      try {
        await this.$store.dispatch('events/deleteEvent', this.eventIdToDelete)
        this.showConfirm = false
        this.eventIdToDelete = null
      } catch (err) {
        console.error('Failed to delete event:', err)
        alert('Failed to delete event. Please try again.')
      }
    },
  },
}
</script>
