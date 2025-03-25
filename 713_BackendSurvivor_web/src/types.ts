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
  type?: 'success' | 'error' | 'info'
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
  student?: {
    studentId: string
    firstName: string
    lastName: string
    department: {
      name: string
    }
  }
  user?: {
    id: number
    username: string
    role: string
  }
  replies: Comment[]
}

// Add Vue Router type augmentation
export interface Position {
  id: number
  title: string
}

