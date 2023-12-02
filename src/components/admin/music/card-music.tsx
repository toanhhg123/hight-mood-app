import { Music } from '@/types/music'
import { Card, CardContent, CardHeader } from '../../ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

type Props = {
  music: Music
}

const CardMusic = ({ music: { image, name, isPremium, id } }: Props) => {
  const navigate = useNavigate()

  return (
    <Card className='cursor-pointer' onClick={() => navigate(`/admin/music/details/${id}`)}>
      <CardHeader className='p-2'>
        <img src={image} className='w-full' alt='' />
      </CardHeader>
      <CardContent className='p-2'>
        <div className=''>
          <h6 className='font-medium'>{name}</h6>
          <Badge variant={isPremium ? 'default' : 'secondary'} className=''>
            {isPremium ? 'premium' : 'normal'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardMusic
