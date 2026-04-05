<template>
  <div>
    <ul class="grid md:grid-cols-3 space-y-4 md:space-y-0 md:gap-4">
      <transition-group name="fade" tag="" div>
        <li v-for="featuredEvent in featuredEvents" :key="featuredEvent.id">
          <base-card>
            <div class="flex flex-col">
              <!-- picture div -->
              <div class="relative">
                <img :src="featuredEvent.image" class="rounded-t-xl" />
                <!-- feeatures , status tag -->
                <div class="absolute top-3 left-3 font-semibold flex text-xs space-x-2">
                  <span
                    v-if="featuredEvent.featured"
                    class="px-3 py-1 text-white bg-primary-gradient rounded-full"
                    >Featured</span
                  >
                  <span
                    :class="[
                      'px-3 py-1 text-white  rounded-full',
                      featuredEvent.status === 'On Sale'
                        ? 'bg-green-500'
                        : featuredEvent.status === 'Selling Fast'
                          ? 'bg-orange-400'
                          : 'bg-red-500',
                    ]"
                  >
                    {{ featuredEvent.status }}
                  </span>
                </div>

                <!-- favourite event button -->
                <button
                  @click="favouriteEvent(featuredEvent.id)"
                  class="absolute p-2 right-3 top-3 rounded-xl justify-center items-center bg-slate-700 hover:bg-white transition duration-100"
                >
                  <span>
                    {{ featuredEvent.isFavourite ? '❤️' : '🤍' }}
                  </span>
                </button>

                <!-- price tag-->
                <div
                  class="absolute bg-white py-2 px-3 right-2 bottom-3 rounded-xl text-purple-700 font-bold"
                >
                  ₦{{ featuredEvent.price }}
                </div>
              </div>
              <!-- event details -->
              <!-- category -->
              <div class="m-5 flex flex-col space-y-1">
                <p class="text-gradient text-sm">{{ featuredEvent.category }}</p>
                <!-- title-->

                <p class="font-bold text-lg">{{ featuredEvent.title }}</p>
                <p class="flex items-center"></p>

                <!-- meta info -->
                <div class="space-y-2 text-sm text-slate-500 mb-4">
                  <div class="flex items-center gap-2">
                    <font-awesome-icon icon="calendar" class="text-primary" />
                    <span>{{ featuredEvent.date }} • {{ featuredEvent.time }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <font-awesome-icon icon="location-dot" class="text-secondary" />
                    <span>{{ featuredEvent.location }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <font-awesome-icon icon="user-group" class="text-tetiary" />
                    <span>{{ featuredEvent.attendees }} attending</span>
                  </div>
                </div>

                <!-- progress bar for limited tickets -->
                <div class="pt-2 pb-4">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-orange-500 font-semibold"
                      >Only {{ featuredEvent.ticketsLeft }} tickets left!</span
                    >
                    <span class="text-slate-400"
                      >{{
                        Math.round((featuredEvent.ticketsLeft / featuredEvent.totalTickets) * 100)
                      }}% available</span
                    >
                  </div>
                  <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-primary-gradient rounded-full"
                      :style="{
                        width: (featuredEvent.ticketsLeft / featuredEvent.totalTickets) * 100 + '%',
                      }"
                    ></div>
                  </div>
                </div>

                <!-- action button -->
                <button
                  :disabled="featuredEvent.status === 'Sold Out'"
                  :class="[
                    'w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2',
                    featuredEvent.status === 'Sold Out'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-primary-gradient text-white hover:shadow-lg hover:scale-[1.02]',
                  ]"
                >
                  <span v-if="featuredEvent.status === 'Sold Out'">Sold Out</span>
                  <span v-else>Get Tickets</span>
                  <font-awesome-icon v-if="featuredEvent.status !== 'Sold Out'" icon="ticket" />
                </button>
              </div>
            </div>
          </base-card>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<style scoped>
/* card entry and exit animations */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

<script>
export default {
  name: 'EventCard',
  props: ['featuredEvents'],

  methods: {
    favouriteEvent(id) {
      this.$store.commit('events/toggleFavorite', id)
    },
  },
}
</script>
