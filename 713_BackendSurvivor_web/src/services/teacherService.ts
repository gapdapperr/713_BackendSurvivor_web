import apiClient from './AxiosClient'

export default {
  getTeacherByDepartmentId(departmentId: number) {
    return apiClient.get('/api/v1/teachers/department/' + departmentId)
  },

  getAllTeachers(pageNo: number, pageSize: number) {
    return apiClient.get('/api/v1/teachers/all?pageNo=' + pageNo + '&pageSize=' + pageSize)
  },

  updateTeacher(teacherId: number, teacher: any) {
    return apiClient.put(`/api/v1/teachers/${teacherId}/update`, teacher)
  },

  addTeacher(teacherData: FormData) {
    return apiClient.post('/api/v1/auth/register-teacher', teacherData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
      },
    })
  }
}
