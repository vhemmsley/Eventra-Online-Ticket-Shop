import LandingPage from '@/components/pages/LandingPage.vue'
import EventsPage from '@/components/pages/EventsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/pages/Auth/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/home', redirect: '/' },
    { path: '/events', component: EventsPage },
    { path: '/login', component: LoginPage },
  ],
})

export default router
