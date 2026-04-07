<template>
  <ul class="flex flex-wrap gap-3 items-center justify-center">
    <li v-for="category in categories" :key="category">
      <button
        @click="selectCategory(category)"
        :class="[
          'border rounded-full border-purple-300 py-1 px-4 shadow-md',
          selectedCategory === category
            ? 'selected-gradient'
            : 'hover:bg-purple-200 transition duration-300',
        ]"
      >
        {{ category }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'EventFilter',
  props: {
    selectedCategory: {
      type: String,
      default: 'All',
    },
  },

  emits: ['update:selectedCategory'],

  computed: {
    categories() {
      return ['All', ...this.$store.getters['events/allCategories']]
    },
  },

  methods: {
    selectCategory(category) {
      this.$emit('update:selectedCategory', category)
    },
  },
}
</script>

<style scoped>
.selected-gradient {
  background: linear-gradient(to right, #7c3aed, #ec4899, #fb923c);
  color: white;
  transition: all 0.3s ease;
}
</style>
