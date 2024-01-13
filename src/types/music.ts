import { User } from './user'

export interface Album {
  id: string
  authorId: string
  name: string
  desc: string
  image: string

  author?: User
  medias?: Media[]
}

export type AlbumCreate = Pick<Album, 'name' | 'image' | 'desc'>

export interface Media {
  id: string
  name: string
  desc: string
  image: string
  src: string
  authorId: string
  isPremium: boolean
  albumId?: string
  author?: User
  album?: Album
  duration?: number
  listenNumber?: number
  mediaTypeId?: string
  mediaType?: MediaType
}

export interface MediaCreate {
  name: string
  src: string
  image: string
  desc: string
  isPremium: boolean
  albumId?: string
  authorId?: string
  mediaTypeId?: string
  duration?: number
  listenNumber?: number
}

export interface MediaType {
  id: string
  name: string
  image: string
  note: string
  medias?: Media[]
}
