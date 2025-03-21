import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-view',
      component: LandingView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
  ],
})

export default router
