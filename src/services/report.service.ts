import http, { ResponseSuccess } from '@/config/http'

interface Report {
  userCount: number
  singerCount: number
  historyCount: number
  favoriteCount: number
  albumCount: number
  mediaCount: number
}

export class ReportService {
  async get() {
    return (await http.get<ResponseSuccess<Report>>('/report')).data
  }
}

export default new ReportService()
