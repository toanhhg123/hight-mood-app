import axios, { AxiosInstance } from 'axios'

export class Http {
  instance!: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8080'
    })
  }
}

export interface ResponseSuccess<T> {
  status: number
  message: string
  element: T
}

const http = new Http().instance

export default http
