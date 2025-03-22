import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import StudentView from '../views/admin/student/StudentView.vue'
import AdminDashboardView from '../views/admin/dashboard/AdminDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin-students',
      name: 'admin-students',
      component: StudentView,
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
    {
      path: 'admin-dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView,
    }
  ],
})

export default router
