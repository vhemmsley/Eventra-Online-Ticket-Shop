<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
/* Base Card Styling */
.card {
  background: white;
  border-radius: 1rem; /* rounded-xl */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

/* Hover effect */
.card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.15); /* slight purple glow */
}

/* Optional: active (click feel) */
.card:active {
  transform: scale(0.98);
}
</style>
