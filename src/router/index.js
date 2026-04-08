import LandingPage from '@/components/pages/LandingPage.vue'
import EventsPage from '@/components/pages/EventsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import UserAuth from '@/components/pages/Auth/UserAuth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/home', redirect: '/' },
    { path: '/events', component: EventsPage },
    { path: '/auth', component: UserAuth },
  ],
})

export default router
