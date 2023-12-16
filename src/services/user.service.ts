import http, { ResponseSuccess } from '@/config/http'
import { User, UserCreate } from '@/types/user'

export class UserService {
  async getUser() {
    return (await http.get<ResponseSuccess<User[]>>('/user')).data
  }

  async getSingers() {
    return (await http.get<ResponseSuccess<User[]>>('/user/singers')).data
  }

  async createUser(body: UserCreate) {
    return (await http.post<ResponseSuccess<User>>('/user', body)).data
  }

  async updateUser(id: string, body: UserCreate) {
    return (await http.patch<ResponseSuccess<User>>(`/user/${id}`, body)).data
  }
}

export default new UserService()
