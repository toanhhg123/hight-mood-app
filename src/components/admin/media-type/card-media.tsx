import { IMAGE_EMPTY } from '@/assets/image-link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { MediaType } from '@/types/music'

type Props = {
  mediaType: MediaType
}

const CardMediaType = ({ mediaType }: Props) => {
  return (
    <Card className='cursor-pointer'>
      <CardHeader className='p-2'>
        <img
          src={mediaType.image}
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
          <h6 className='font-medium truncate'>{mediaType.name}</h6>
        </div>
      </CardContent>
      <CardFooter className='p-2 gap-2'></CardFooter>
    </Card>
  )
}

export default CardMediaType
