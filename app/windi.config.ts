import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: '#1A4FC8'
      },
      boxShadow: {
        default: '0 0 20px 0 rgba(0, 0, 0, 0.1)'
      },
      fontFamily: {
        bai: ['bai-jamjuree', 'system-ui']
      }
    }
  },
  shortcuts: {
    shape: 'border-2 border-red-500',
    'wh-full': 'w-full h-full',
    'flex-center': 'flex items-center justify-center',
    'custom-container': 'container mx-auto <md:w-11/12'
  }
})
