import apiClient from './AxiosClient'

export default {
  registerStudent(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    departmentId: number,
    file?: File,
  ) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('departmentId', departmentId.toString())
    if (file) {
      formData.append('profile', file)
    }

    return apiClient.post('/api/v1/auth/registerStudent', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
