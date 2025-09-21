import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/friends/FriendsView.vue'),
    },
    {
      path: '/gifts',
      name: 'gifts',
      component: () => import('../views/gifts/GiftsView.vue'),
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: () => import('../views/friends/AppointmentsView.vue'),
    },
  ],
})

export default router
