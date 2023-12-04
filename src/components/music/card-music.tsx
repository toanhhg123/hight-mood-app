import { Media } from '@/types/music'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { IMAGE_EMPTY } from '@/assets/image-link'

type Props = {
  music: Media
}

const CardMusic = ({ music: { image, name, isPremium, id } }: Props) => {
  const navigate = useNavigate()

  return (
    <Card className='cursor-pointer' onClick={() => navigate(`/admin/music/details/${id}`)}>
      <CardHeader className='p-2'>
        <img
          src={image}
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
          <h6 className='font-medium truncate'>{name}</h6>
          <Badge variant={isPremium ? 'default' : 'secondary'} className=''>
            {isPremium ? 'premium' : 'normal'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardMusic
