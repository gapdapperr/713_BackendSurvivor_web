import CancelAppointment from '@/components/CancelAppointment.vue'
import apiClient from './AxiosClient'

export default {
  getAppointmentsByStudentId(studentId: string) {
    return apiClient.get(`/api/v1/appointments/student/${studentId}`)
  },

  confirmAppointmentByStudent(appointmentId: number) {
    return apiClient.put(`/api/v1/appointments/${appointmentId}/student-confirm`)
  },

  cancelAppointment(appointmentId: number) {
    return apiClient.put(`/api/v1/appointments/${appointmentId}/cancel`)
  },

  addNewAppointment(appointment: any) {
    return apiClient.post('/api/v1/appointments/new-appointment', appointment)
}
}
