import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3
    },
    mutations: {
      onError(error) {
        if (isAxiosError(error)) {
          const content = error.response?.data
          if (content && ('message' in content)) {
            toast.error(error.response?.data.message)
          } else {
            toast.error('Erro ao processar operação!')
          }
        }
      },
    },
  }
})
