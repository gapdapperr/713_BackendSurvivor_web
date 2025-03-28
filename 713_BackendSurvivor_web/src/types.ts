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

export interface TeacherState {
  teacher: Teacher | null
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

export interface Appointment {
  id: number
  title: string
  content: string
  requestedTime: string
  finalTime: string
  status: string
  isAccepted: boolean
  createdAt: string
}

export interface AppointmentByTeacher {
  id: number
  title: string
  content: string
  requestedTime: string
  finalTime: string
  createdAt: string
  status: string
  isAccepted: boolean
  student: {
    id: number
    firstName: string
    lastName: string
    user: {
      profile: string
    }
  }
}

export interface Announcement {
  id: number
  title: string
  content: string
  fileUrl: string
  createdAt: string
  updatedAt: string
  teacherId: number
}

export interface CreateAnnouncementForm {
  title: string
  content: string
  teacherId: number
  file: File | null
}