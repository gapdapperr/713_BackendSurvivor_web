import AdminDashboardView from '@/views/dashboard-admin/DashBoardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //{
    //  path: '/',
    //  name: 'landing-view',
    //  component: LandingView,
    //},
    {
      path: '/login',
      name: 'login-view',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register-view',
      component: RegisterView,
    },
    {
      path: '/admin',
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      children: [
        {
          path: '/admindashboard',
          name: 'admin-dashboard-view',
          component: AdminDashboardView,
        },
      //  {
      //    path: 'teachers',
      //    name: 'admin-teachers-view',
      //    component: TestPageView,
      //  },
      //  {
      //    path: 'students',
      //    name: 'admin-students-view',
      //    component: StudentView,
      //    props: (route) => ({
      //      page: parseInt(route.query.page as string) || 1,
      //    }),
      //  },
      //  {
      //    path: 'summary',
      //    name: 'admin-summary-view',
      //    component: TestPageView,
      //  },
      ],
    },
  //  {
  //    path: '/teacher',
  //    meta: { requiresAuth: true, role: 'ROLE_TEACHER' },
  //    children: [
  //      {
  //        path: '',
  //        name: 'teacher-dashboard-view',
  //        component: TeacherDashboardView,
  //      },
  //      {
  //        path: 'students',
  //        name: 'teacher-students-view',
  //        component: TestPageView,
  //      },
  //      {
  //        path: 'announcements',
  //        name: 'teacher-announcements-view',
  //        component: TestPageView,
  //      },
  //      {
  //        path: 'appointments',
  //        name: 'teacher-appointments-view',
  //        component: TestPageView,
  //      },
  //    ],
  //  },
  //  {
  //    path: '/student',
  //    meta: { requiresAuth: true, role: 'ROLE_STUDENT' },
  //    children: [
  //      {
  //        path: '',
  //        name: 'student-dashboard-view',
  //        component: StudentDashboardView,
  //      },
  //      {
  //        path: 'teacher',
  //        name: 'student-teacher-view',
  //        component: TestPageView,
  //      },
  //      {
  //        path: 'announcements',
  //        name: 'student-announcements-view',
  //        component: TestPageView,
  //      },
  //      {
  //        path: 'appointments',
  //        name: 'student-appointments-view',
  //        component: TestPageView,
  //      },
  //    ],
  //  },
  //  {
  //    path: '/network-error',
  //    name: 'network-error-view',
  //    component: NetworkErrorView,
  //  },

  //  {
  //    path: '/404/:resource',
  //    name: '404-resource-view',
  //    component: NotFoundView,
  //    props: true,
  //  },

  //  {
  //    path: '/:catchAll(.*)',
  //    name: 'not-found',
  //    component: NotFoundView,
  //  },
  ],
})

export default router