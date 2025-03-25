import type { StudentState, Student } from '@/types'
import { defineStore } from 'pinia'
export const useStudentStore = defineStore('student', {
  state: (): StudentState => ({
    student: null,
  }),
  actions: {
    setStudent(student: Student): void {
      this.student = student
    },
  },
})
