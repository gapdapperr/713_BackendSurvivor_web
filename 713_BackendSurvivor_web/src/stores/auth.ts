import apiClient from '@/services/AxiosClient'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/authenticate', {
        username: email,
        password: password,
      })
      this.token = response.data.access_token
      return response
    },
  },
})
