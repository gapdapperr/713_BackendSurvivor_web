import type { TeacherState, Teacher } from '@/types'
import { defineStore } from 'pinia'
export const useTeacherStore = defineStore('teacher', {
  state: (): TeacherState => ({
    teacher: null,
  }),
  actions: {
    setTeacher(teacher: Teacher): void {
      this.teacher = teacher
    },
  },
})
