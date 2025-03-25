import apiClient from './AxiosClient'

export default {
  getCommentTeacherByStudentId(studentId: string) {
    return apiClient.get('/api/v1/comments/teacher-student/' + studentId)
  },
  addComment(studentId: string, content: string) {
    return apiClient.post('/api/v1/comments/add', { studentId, content })
  },
  addReply(commentId: number, studentId: string, content: string) {
    return apiClient.post('/api/v1/comments/teacher-reply', { commentId, studentId, content })
  },
}
