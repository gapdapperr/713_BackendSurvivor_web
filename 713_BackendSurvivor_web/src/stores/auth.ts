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
          { name: 'หน้าหลักผู้ดูแลระบบ', routeName: 'admin-dashboard' },
          { name: 'จัดการอาจารย์', routeName: 'manage-teachers' },
          { name: 'จัดการนักศึกษา', routeName: 'manage-students' },
          { name: 'สรุปข้อมูล', routeName: 'summary' },
        ]
      } else if (this.isTeacher) {
        return [
          { name: 'หน้าหลักอาจารย์', routeName: 'teacher-dashboard' },
          { name: 'รายชื่อนักศึกษา', routeName: 'student-list' },
          { name: 'จัดการประกาศ', routeName: 'manage-announcements' },
          { name: 'การนัดหมาย', routeName: 'teacher-appointments' },
        ]
      } else if (this.isStudent) {
        return [
          { name: 'หน้าหลักนักศึกษา', routeName: 'student-dashboard' },
          { name: 'อาจารย์ที่ปรึกษา', routeName: 'teacher' },
          { name: 'ประกาศ', routeName: 'student-announcements' },
          { name: 'การนัดหมาย', routeName: 'student-appointments' },
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
