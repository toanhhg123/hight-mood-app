import { IMAGE_EMPTY } from '@/assets/image-link'
import { Album } from '@/types/music'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

import AlbumActions from './album-action'

type Props = {
  album: Album
}

const CardAlbum = ({ album }: Props) => {
  return (
    <Card className='cursor-pointer'>
      <CardHeader className='p-2'>
        <img
          src={album.image}
          className=''
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = IMAGE_EMPTY
          }}
          style={{ height: '200px', width: '200px' }}
          alt=''
        />
      </CardHeader>
      <CardContent className='p-2'>
        <div className=''>
          <h6 className='font-medium truncate'>{album.name}</h6>
        </div>
      </CardContent>
      <CardFooter className='p-2 gap-2'>
        <AlbumActions album={album} />
      </CardFooter>
    </Card>
  )
}

export default CardAlbum
