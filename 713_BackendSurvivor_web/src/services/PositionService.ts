import apiClient from './AxiosClient'

export default {
  getPositions() {
    return apiClient.get('/api/v1/academic-positions')
  },
}
