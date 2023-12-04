import http, { ResponseSuccess } from '@/config/http'
import { Media, MediaCreate } from '@/types/music'

export class MediaService {
  async getMedias() {
    return (await http.get<ResponseSuccess<Media[]>>('/media')).data
  }

  async findById(id: string) {
    return (await http.get<ResponseSuccess<Media>>(`/media/${id}`)).data
  }

  async createMedia(media: MediaCreate) {
    return (await http.post<ResponseSuccess<Media>>('/media', media)).data
  }

  async updateMedia(id: string, media: Partial<MediaCreate>) {
    return (await http.patch<ResponseSuccess<Media>>(`/media/${id}`, media)).data
  }
}

export default new MediaService()
