import apiClient from './AxiosClient'


export default {
  getLatestAnnouncement() {
    return apiClient.get('/api/v1/announcements/latest')
  },

  getAnnouncementsForStudent(teacherId: number) {
    return apiClient.get(`/api/v1/announcements/teacher/${teacherId}`)
  }
}
