export interface Student {
  id: number
  studentId: string
  firstName: string
  lastName: string
  user: {
    id: number
    profile: string
  }
  department: {
    id: number
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
