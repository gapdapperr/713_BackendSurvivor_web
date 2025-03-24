import type { MessageState } from '@/types'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: (): MessageState => ({
    message: '',
    type: 'info',
  }),
  actions: {
    updateMessage(newMessage: string, type: 'success' | 'error' | 'info' = 'info') {
      this.message = newMessage
      this.type = type
      // Auto clear after 3 seconds
      setTimeout(() => {
        this.resetMessage()
      }, 3000)
    },
    resetMessage() {
      this.message = ''
      this.type = 'info'
    },
  },
})
