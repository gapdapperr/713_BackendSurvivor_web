export interface Student {
  id: number
  studentId: string
  firstName: string
  lastName: string
  profilePicture: string
  department: {
    name: string
  }
  teacher?: {
    firstName: string
    lastName: string
    academicPosition: {
      title: string
    }
  }
}
