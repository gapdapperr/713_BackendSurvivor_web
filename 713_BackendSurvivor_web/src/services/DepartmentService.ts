import apiClient from './AxiosClient'

export default {
  getDepartments() {
    return apiClient.get('/api/v1/departments')
  },
}
