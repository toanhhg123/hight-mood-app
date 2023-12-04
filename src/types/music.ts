import { User } from './user'

export interface Album {
  id: string
  name: string
  authorId: string
  desc: string
  image: string

  author?: User
  medias?: Media[]
}

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
}

export interface MediaCreate {
  name: string
  src: string
  image: string
  desc: string
  isPremium: boolean
  albumId?: string
}
