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

export interface StudentState {
  student: Student | null
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

export interface Comment {
  id: number
  content: string
  createdAt: string
  teacher: {
    id: number
    firstName: string
    lastName: string
    academicPosition: {
      title: string
    }
  }
  student: {
    studentId: string
    firstName: string
    lastName: string
    department: {
      name: string
    }
  }
  replies: Comment[]
}

// Add Vue Router type augmentation
