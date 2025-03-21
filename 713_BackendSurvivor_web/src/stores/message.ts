import type { MessageState } from '@/type'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: (): MessageState => ({
    message: '',
  }),
  actions: {
    updateMessage(newMessage: string) {
      this.message = newMessage
    },
    resetMessage() {
      this.message = ''
    },
  },
})
