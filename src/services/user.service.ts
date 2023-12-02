import http, { ResponseSuccess } from '@/config/http'
import { User } from '@/types/user'

export class UserService {
  async getUser() {
    return (await http.get<ResponseSuccess<User[]>>('/user')).data
  }
}

export default new UserService()
