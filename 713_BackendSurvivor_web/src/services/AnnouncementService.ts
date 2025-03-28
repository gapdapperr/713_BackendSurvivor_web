import apiClient from './AxiosClient'
import type { CreateAnnouncementForm } from '@/types'

export default {
  getAnnouncementsByTeacher() {
    return apiClient.get('/api/v1/announcements/byteacher')
  },

  createAnnouncement(data: CreateAnnouncementForm) {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('teacherId', String(data.teacherId))

    if (data.file) {
      formData.append('announcement', data.file)
    }

    return apiClient.post('/api/v1/announcements/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
