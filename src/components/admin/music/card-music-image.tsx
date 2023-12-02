import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Music } from '@/types/music'
import { Copy, PenLine } from 'lucide-react'

interface Props {
  music: Music
}

const CardMusicImage = ({ music }: Props) => {
  return (
    <Card className=''>
      <CardHeader className='p-2 flex flex-row items-center justify-between'></CardHeader>
      <CardContent className=''>
        <img src={music.image} className='my-4 rounded-sm' alt='' />
        <div className='flex gap-2 items-center'>
          <Button variant={'outline'} size={'icon'}>
            <PenLine className='w-4' />
          </Button>
          <div className='rounded-sm p-2 flex  bg-gray-200 items-center flex-1 truncate text-sm text-gray-700'>
            <p className='truncate'>{music.image || 'no update'}</p>
            <Button size={'icon'} variant={'outline'} className='px-3'>
              <Copy className='w-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardMusicImage
