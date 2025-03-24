export interface User {
  id: number
  username: string
  role: string
  profile: string
  teacher?: {
    id: number
    firstName: string
    lastName: string
    department: {
      id: number
      name: string
    }
    academicPosition: {
      id: number
      title: string
    }
  }
  student?: {
    id: number
    studentId: string
    firstName: string
    lastName: string
    department: {
      id: number
      name: string
    }
    teacher?: {
      id: number
      firstName: string
      lastName: string
      academicPosition: {
        id: number
        title: string
      }
    }
  }
}

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
