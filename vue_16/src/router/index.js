import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import EditView from '@/views/EditView.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: "/edit/:id?",
      name: "edit",
      meta: {
        requiredAuth: true,
      },
      component: EditView,
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta?.requiredAuth) {
    let isAuthenticated = store.state.auth.user
    if (!isAuthenticated) isAuthenticated = await
      store.dispatch('auth/loginWithCredential')
    if (!isAuthenticated)
      return {
        name: 'login',
      }
  }
})

export default router
