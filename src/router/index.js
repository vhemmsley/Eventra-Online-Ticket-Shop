import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/components/pages/LandingPage.vue'
import EventsPage from '@/components/pages/EventsPage.vue'
import AuthPage from '@/components/pages/Auth/AuthPage.vue'

import HostDashboard from '@/components/pages/hosts/HostDashboard.vue'
import ManageEvent from '@/components/pages/hosts/ManageEvent.vue'
import CreateEvent from '@/components/pages/hosts/CreateEvent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/home', redirect: '/' },
    { path: '/events', component: EventsPage },
    { path: '/auth', component: AuthPage },
    { path: '/host/dashboard', component: HostDashboard },
    { path: '/host/create-event', component: CreateEvent },
    { path: '/host/manage-event/:id', component: ManageEvent },
  ],
})

export default router
