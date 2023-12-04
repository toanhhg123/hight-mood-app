import http, { ResponseSuccess } from '@/config/http'
import { Album, AlbumCreate } from '@/types/music'

export class MediaService {
  async getMyAlbum() {
    return (await http.get<ResponseSuccess<Album[]>>('/album/my-album')).data
  }

  async createAlbum(album: AlbumCreate) {
    return (await http.post<ResponseSuccess<Album>>('/album', album)).data
  }

  async updateAlbum(id: string, album: Partial<AlbumCreate>) {
    return (await http.patch<ResponseSuccess<Album>>(`/album/${id}`, album)).data
  }
}

export default new MediaService()
