import { User } from './user'

export interface Album {
  id: string
  name: string
  authorId: string
  desc: string
  image: string

  author?: User
  medias?: Music[]
}

export interface Music {
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
