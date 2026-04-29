<template>
  <div>
    <base-card>
      <div class="flex flex-col">
        <!-- picture div -->
        <div class="relative">
          <!-- image block -->
          <div class="relative w-full h-[200px] overflow-hidden rounded-t-xl">
            <!-- Skeleton loader -->
            <div
              v-if="!imageLoaded"
              class="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            ></div>

            <!-- Actual Image -->
            <img
              :src="event.image"
              @load="imageLoaded = true"
              :class="[
                'w-full h-full object-cover transition-all duration-700',
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              ]"
            />
          </div>

          <!-- feeatures , status tag -->
          <div class="absolute top-3 left-3 font-semibold flex text-xs space-x-2">
            <span
              v-if="event.featured"
              class="px-3 py-1 text-white bg-primary-gradient rounded-full"
              >Featured</span
            >
            <span
              :class="[
                'px-3 py-1 text-white rounded-full',
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

          <!-- favourite event button -->
          <button
            @click="favouriteEvent(event.id)"
            class="absolute p-2 right-3 top-3 rounded-xl justify-center items-center bg-slate-700 hover:bg-white transition duration-100"
          >
            <span>
              {{ event.isFavourite ? '❤️' : '🤍' }}
            </span>
          </button>

          <!-- price tag-->
          <div
            class="absolute bg-white py-2 px-3 right-2 bottom-3 rounded-xl text-purple-700 font-bold"
          >
            ₦{{ event.price.toLocaleString() }}
          </div>
        </div>
        <!-- event details -->
        <!-- category -->
        <div class="m-5 flex flex-col space-y-1">
          <p class="text-gradient text-sm">{{ event.category }}</p>
          <!-- title-->

          <p class="font-bold text-lg">{{ event.title }}</p>
          <p class="flex items-center"></p>

          <!-- meta info -->
          <div class="space-y-2 text-sm text-slate-500 mb-4">
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="calendar" class="text-primary" />
              <span>{{ event.date }} • {{ event.time }}</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="location-dot" class="text-secondary" />
              <span>{{ event.location }}</span>
            </div>
            <div class="flex items-center gap-2">
              <font-awesome-icon icon="user-group" class="text-tetiary" />
              <span>{{ event.attendees }} attending</span>
            </div>
          </div>

          <!-- progress bar for limited tickets -->
          <div class="pt-2 pb-4">
            <div class="flex justify-between text-xs mb-1">
              <span class="text-orange-500 font-semibold"
                >Only {{ event.ticketsLeft }} tickets left!</span
              >
              <span class="text-slate-400"
                >{{ Math.round((event.ticketsLeft / event.totalTickets) * 100) }}% available</span
              >
            </div>
            <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-primary-gradient rounded-full"
                :style="{
                  width: (event.ticketsLeft / event.totalTickets) * 100 + '%',
                }"
              ></div>
            </div>
          </div>

          <!-- action button -->
          <button
            @click="purchaseTicket()"
            :disabled="event.eventStatus !== 'on_sale'"
            :class="[
              'w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2',
              event.eventStatus !== 'on_sale'
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-primary-gradient text-white hover:shadow-lg hover:scale-[1.02]',
            ]"
          >
            <span v-if="event.eventStatus === 'sold_out'">Sold Out</span>
            <span v-else-if="event.eventStatus === 'paused'">Sales Paused</span>
            <span v-else>Get Tickets</span>

            <font-awesome-icon v-if="event.eventStatus === 'on_sale'" icon="ticket" />
          </button>
        </div>
      </div>
    </base-card>
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: 'EventCard',
  props: ['event'],

  data() {
    return {
      imageLoaded: false,
    }
  },

  methods: {
    favouriteEvent(id) {
      this.$store.commit('events/toggleFavorite', id)
    },

    purchaseTicket() {
      this.$router.push(`/events/purchase/${this.event.id}`)
    },
  },
}
</script>
