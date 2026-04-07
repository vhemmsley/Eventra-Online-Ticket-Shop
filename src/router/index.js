import LandingPage from '@/components/pages/LandingPage.vue'
import EventsPage from '@/components/pages/EventsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/home', redirect: '/' },
    { path: '/events', component: EventsPage },
  ],
})

export default router
