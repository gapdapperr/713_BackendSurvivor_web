import { defineStore } from 'pinia'
import apiClient from '@/services/AxiosClient'
import type { User } from '@/types'

interface NavigationItem {
  name: string
  routeName: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),

  getters: {
    currentUserName(): string {
      return this.user?.username || ''
    },
    isAdmin(): boolean {
      return this.user?.role.includes('ROLE_ADMIN') || false
    },
    isTeacher(): boolean {
      return this.user?.role.includes('ROLE_TEACHER') || false
    },
    isStudent(): boolean {
      return this.user?.role.includes('ROLE_STUDENT') || false
    },
    navigationItems(): NavigationItem[] {
      if (this.isAdmin) {
        return [
          { name: 'หน้าหลักผู้ดูแลระบบ', routeName: 'admin-dashboard-view' },
          { name: 'จัดการอาจารย์', routeName: 'admin-teachers-view' },
          { name: 'จัดการนักศึกษา', routeName: 'admin-students-view' },
          { name: 'สรุปการนัดหมาย', routeName: 'admin-summary-view' },
        ]
      } else if (this.isTeacher) {
        return [
          { name: 'หน้าหลักอาจารย์', routeName: 'teacher-dashboard-view' },
          { name: 'รายชื่อนักศึกษา', routeName: 'teacher-students-view' },
          { name: 'สร้างประกาศ', routeName: 'teacher-announcements-view' },
          { name: 'การนัดหมาย', routeName: 'teacher-appointments-view' },
        ]
      } else if (this.isStudent) {
        return [
          { name: 'หน้าหลักนักศึกษา', routeName: 'student-dashboard-view' },
          { name: 'สร้างนัดหมายอาจารย์', routeName: 'student-appointments-view' },
          { name: 'ประกาศ', routeName: 'student-announcements-view' },
          { name: 'รายการความคิดเห็น', routeName: 'student-teacher-view' },
        ]
      }
      return []
    },
    isAuthenticated(): boolean {
      return !!this.token && !!this.user
    },
  },

  actions: {
    async login(email: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/authenticate', {
        username: email,
        password: password,
      })
      this.token = response.data.access_token
      localStorage.setItem('access_token', this.token as string)
      const meResponse = await apiClient.get('/api/v1/auth/me')
      this.user = meResponse.data.user
      localStorage.setItem('user', JSON.stringify(this.user))

      return response
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
    },
    reload(token: string, user: User) {
      this.token = token
      this.user = user
    },
  },
})
