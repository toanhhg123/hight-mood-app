import http, { IResponsePagination, ResponseSuccess } from '@/config/http'
import { MediaType } from '@/types/music'

export class MediaTypeService {
  async getMediaTypes() {
    return (await http.get<IResponsePagination<MediaType>>('/mediaType')).data
  }

  async create(body: Omit<MediaType, 'id' | 'medias'>) {
    return (await http.post<ResponseSuccess<MediaType>>('/mediaType', body)).data
  }

  async update(id: string, mediaType: Partial<MediaType>) {
    return (await http.patch<ResponseSuccess<MediaType>>(`/mediaType/${id}`, mediaType)).data
  }

  async delete(id: string) {
    return (await http.delete<ResponseSuccess<MediaType>>(`/mediaType/${id}`)).data
  }
}

export default new MediaTypeService()
