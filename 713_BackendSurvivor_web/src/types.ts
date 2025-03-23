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
  user: {
    id: number
    profile: string
  }
  academicPosition: {
    id: number
    title: string
  }
  department: {
    id: number
    name: string
  }
  _count?: {
    students: number
  }
}

export interface MessageState {
  message: string
}

export interface Department {
  id: number
  name: string
}

export interface Position {
  id: number
  title: string
}
