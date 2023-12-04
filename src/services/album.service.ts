import http, { ResponseSuccess } from '@/config/http'
import { Album } from '@/types/music'

export class MediaService {
  async getMyAlbum() {
    return (await http.get<ResponseSuccess<Album[]>>('/album/my-album')).data
  }
}

export default new MediaService()
