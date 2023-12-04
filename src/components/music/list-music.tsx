import { Media } from '@/types/music'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'

interface Props {
  musics: Media[]
}

const ListMusic = ({ musics }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      {musics.map((music) => (
        <Card key={music.id}>
          <CardContent className='flex items-center justify-between gap-2 h-full p-2'>
            <div className='flex gap-2 items-center'>
              <Avatar>
                <AvatarImage src={music.image} alt='@shadcn' />
                <AvatarFallback>{music.name}</AvatarFallback>
              </Avatar>
              <Separator orientation='vertical' className='' />
              <div>
                <Badge variant={'secondary'}>name</Badge>
                <p className='truncate text-sm text-sky-700 font-semibold max-w-[300px]'>{music.name}</p>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <span className={cn('w-2 h-2 rounded-full', music.isPremium ? 'bg-green-400' : 'bg-yellow-500')}></span>
              <Badge variant={music.isPremium ? 'default' : 'outline'}>{music.isPremium ? 'premium' : 'normal'}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ListMusic
