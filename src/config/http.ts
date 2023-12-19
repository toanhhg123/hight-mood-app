import { KEY_AUTH_LOCAL } from '@/contexts/auth.context'
import localStore from '@/utils/localstore'
import axios, { AxiosInstance } from 'axios'

export class Http {
  instance!: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://14.225.206.52:8080'
    })

    this.instance.interceptors.request.use(
      (config) => {
        const token = localStore.getStringLocal(KEY_AUTH_LOCAL)

        if (token) config.headers.Authorization = `Bearer ${token}`

        return config
      },
      (error) => Promise.reject(error)
    )
  }
}

export interface ResponseSuccess<T> {
  status: number
  message: string
  element: T
}

const http = new Http().instance

export default http
