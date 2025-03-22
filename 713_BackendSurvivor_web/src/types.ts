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
    id: number
    firstName: string
    lastName: string
    academicPosition: {
      title: string
    }
  }
}

export interface Teacher {
  id: number
  firstName: string
  lastName: string
  academicPosition: {
    title: string
  }
}

export interface MessageState {
  message: string
}

export interface Department {
  id: number
  name: string
}
