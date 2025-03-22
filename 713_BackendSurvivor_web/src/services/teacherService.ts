import apiClient from './AxiosClient'

export default {
  getTeacherByDepartmentId(departmentId: number) {
    return apiClient.get('/api/v1/teachers/department/' + departmentId)
  },
}
