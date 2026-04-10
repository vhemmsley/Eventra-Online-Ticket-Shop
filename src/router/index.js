import LandingPage from '@/components/pages/LandingPage.vue'
import EventsPage from '@/components/pages/EventsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthPage from '@/components/pages/Auth/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/home', name: 'home', redirect: '/' },
    { path: '/events', name: 'events', component: EventsPage },
    { path: '/auth', name: 'auth', component: AuthPage },
  ],
})

export default router
