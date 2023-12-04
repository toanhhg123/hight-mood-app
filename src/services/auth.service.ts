import http, { ResponseSuccess } from '@/config/http'
import { User } from '@/types/user'

export class UserService {
  async getMe() {
    return (await http.get<ResponseSuccess<User>>('/user/me')).data
  }

  async login(email: string, password: string) {
    return (await http.post<ResponseSuccess<{ accessToken: string }>>('/auth/login', { email, password })).data
  }
}

export default new UserService()
