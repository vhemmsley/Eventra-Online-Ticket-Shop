import LandingPage from '@/components/pages/LandingPage.vue'
import EventsPage from '@/components/pages/EventsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/components/pages/Auth/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/home', redirect: '/' },
    { path: '/events', component: EventsPage },
    { path: '/auth', component: AuthPage },
  ],
})

export default router
