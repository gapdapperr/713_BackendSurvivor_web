import apiClient from './AxiosClient'

export default {
  getStudents(pageNo: number, pageSize: number, keyword: string) {
    return apiClient.get(
      '/api/v1/students/all?pageNo=' + pageNo + '&pageSize=' + pageSize + '&keyword=' + keyword,
    )
  },
  updateTeacherId(studentId: string, teacherId: number) {
    return apiClient.put('/api/v1/students/update-teacher', {
      studentId,
      teacherId,
    })
  },
  getStudentByTeacherId(teacherId: number) {
    return apiClient.get('/api/v1/students/teacher/' + teacherId)
  },
  getStudentByStudentId(studentId: string) {
    return apiClient.get('/api/v1/students/' + studentId)
  },
}
