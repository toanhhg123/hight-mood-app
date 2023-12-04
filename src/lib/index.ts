import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const handleToastError = (error: unknown) => {
  if (error instanceof AxiosError) return toast.error(error.response?.data?.message)
  if (error instanceof Error) return toast.error(error.message)

  toast.error(JSON.stringify(error))
}
