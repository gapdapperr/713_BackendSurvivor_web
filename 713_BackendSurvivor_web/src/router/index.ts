import { createRouter, createWebHistory } from 'vue-router'

import StudentService from '@/services/StudentService'
import TeacherService from '@/services/teacherService'
import { useAuthStore } from '@/stores/auth'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'
import LandingView from '@/views/LandingView.vue'
import LoginView from '@/views/LoginView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import AdminDashboardView from '@/views/dashboard-admin/DashboardView.vue'
import AppointmentSummaryView from '@/views/dashboard-admin/appointment-summary/AppointmentSummaryView.vue'
import StudentView from '@/views/dashboard-admin/student/StudentView.vue'
import TeacherView from '@/views/dashboard-admin/teacher/TeacherView.vue'
import StudentDashboardView from '@/views/dashboard-student/DashboardView.vue'
import StudentAnnouncementView from '@/views/dashboard-student/announcement/AnnouncementView.vue'
import StudentAppointmentView from '@/views/dashboard-student/appointment/AppointmentView.vue'
import StudentCommentView from '@/views/dashboard-student/comment/CommentView.vue'
import TeacherDashboardView from '@/views/dashboard-teacher/DashboardView.vue'
import TeacherAnnouncementView from '@/views/dashboard-teacher/announcement/AnnouncementView.vue'
import TeacherAppointmentView from '@/views/dashboard-teacher/appointment/AppointmentView.vue'
import TeacherStudentView from '@/views/dashboard-teacher/student/StudentView.vue'
import TeacherCommentView from '@/views/dashboard-teacher/student/comment/CommentView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-view',
      component: LandingView,
    },
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
          path: '',
          name: 'admin-dashboard-view',
          component: AdminDashboardView,
        },
        {
          path: 'teachers',
          name: 'admin-teachers-view',
          component: TeacherView,
          props: (route) => ({
            page: parseInt(route.query.page as string) || 1,
          }),
        },
        {
          path: 'students',
          name: 'admin-students-view',
          component: StudentView,
          props: (route) => ({
            page: parseInt(route.query.page as string) || 1,
          }),
        },
        {
          path: 'summary',
          name: 'admin-summary-view',
          component: AppointmentSummaryView,
        },
      ],
    },
    {
      path: '/teacher',
      meta: { requiresAuth: true, role: 'ROLE_TEACHER' },
      children: [
        {
          path: '',
          name: 'teacher-dashboard-view',
          component: TeacherDashboardView,
        },
        {
          path: 'students',
          name: 'teacher-students-view',
          component: TeacherStudentView,
        },
        {
          path: 'students/:studentId/comments',
          name: 'teacher-student-comments-view',
          component: TeacherCommentView,
          props: true,
          beforeEnter: (to) => {
            const id = to.params.studentId as string
            const studentStore = useStudentStore()
            return StudentService.getStudentByStudentId(id)
              .then((response) => {
                // need to setup the data for the event
                studentStore.setStudent(response.data)
              })
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  return {
                    name: '404-resource-view',
                    params: { resource: 'student' },
                  }
                } else {
                  return { name: 'network-error-view' }
                }
              })
          },
        },
        {
          path: 'announcements',
          name: 'teacher-announcements-view',
          component: TeacherAnnouncementView,
        },
        {
          path: 'appointments',
          name: 'teacher-appointments-view',
          component: TeacherAppointmentView,
        },
      ],
    },
    {
      path: '/student',
      meta: { requiresAuth: true, role: 'ROLE_STUDENT' },
      children: [
        {
          path: '',
          name: 'student-dashboard-view',
          component: StudentDashboardView,
        },
        {
          path: 'teacher',
          name: 'student-teacher-view',
          component: StudentCommentView,
          beforeEnter: () => {
            const teacherStore = useTeacherStore()
            return TeacherService.getMyTeacher()
              .then((response) => {
                // need to setup the data for the event
                teacherStore.setTeacher(response.data)
              })
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  return {
                    name: '404-resource-view',
                    params: { resource: 'teacher' },
                  }
                } else {
                  return { name: 'network-error-view' }
                }
              })
          },
        },
        {
          path: 'announcements',
          name: 'student-announcements-view',
          component: StudentAnnouncementView,
        },
        {
          path: 'appointments',
          name: 'student-appointments-view',
          component: StudentAppointmentView,
        },
      ],
    },
    {
      path: '/unauthorized',
      name: 'unauthorized-view',
      component: UnauthorizedView,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // ตรวจสอบว่า route ต้องการ authentication หรือไม่
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // ถ้าไม่ได้ login ให้ไปหน้า login
    next({ name: 'login-view' })
    return
  }

  // ตรวจสอบ role ว่าตรงกับที่กำหนดใน meta หรือไม่
  if (to.meta.role && !authStore.user?.role.includes(to.meta.role as string)) {
    // ถ้า role ไม่ตรง ให้ไปหน้า unauthorized หรือ redirect กลับ
    next({ name: 'unauthorized-view' })
    return
  }

  // ถ้าผ่านการตรวจสอบทั้งหมด
  next()
})

export default router
