import http from '@/config/http'

export class UploadService {
  async upload(file: File) {
    const form = new FormData()
    form.append('file', file)
    return (await http.post<{ data: { url: string } }>(`/upload`, form)).data
  }
}

export default new UploadService()
