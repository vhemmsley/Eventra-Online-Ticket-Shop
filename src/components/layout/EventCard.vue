<template>
  <div>
    <ul class="grid md:grid-cols-3 space-y-4 md:space-y-0 md:gap-4">
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
                class="absolute p-1 right-3 top-3 rounded-full justify-center items-center bg-slate-200 hover:bg-white"
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
          </div>
          {{ featuredEvent.title }}
        </base-card>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: 'EventCard',

  methods: {
    favouriteEvent(id) {
      this.$store.commit('events/toggleFavorite', id)
    },
  },

  computed: {
    featuredEvents() {
      return this.$store.getters['events/featuredEvents']
    },
  },
}
</script>
