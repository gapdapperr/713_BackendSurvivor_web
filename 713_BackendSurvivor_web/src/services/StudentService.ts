import apiClient from './AxiosClient'

export default {
  getStudents(pageNo: number, pageSize: number, keyword: string) {
    return apiClient.get(
      '/api/v1/students/all?pageNo=' + pageNo + '&pageSize=' + pageSize + '&keyword=' + keyword,
    )
  },
}
