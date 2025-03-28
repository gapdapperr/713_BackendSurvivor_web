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
  },

  getAppointmentsByTeacherId(teacherId: string) {
    return apiClient.get(`/api/v1/appointments/teacher/${teacherId}`)
  },

  confirmAppointmentByTeacher(appointmentId: number) {
    return apiClient.put(`/api/v1/appointments/${appointmentId}/teacher-confirm`)
  },

  rescheduleAppointment(appointmentId: number, newDate: string) {
    return apiClient.put(`/api/v1/appointments/${appointmentId}/teacher-reschedule`, {
      finalTime: newDate,
    })
  },

  getSummary() {
    return apiClient.get('/api/v1/appointments/all')
  },
}
