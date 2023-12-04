import CardMusic from '@/components/admin/music/card-music'
import CreateMusic from '@/components/admin/music/create-music'
import SkeletonLoading from '@/components/skeleton-loading'
import { Separator } from '@/components/ui/separator'
import mediaService from '@/services/media.service'
import { useQuery } from 'react-query'

const MusicPage = () => {
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ['music'],
    queryFn: mediaService.getMedias,
    keepPreviousData: true,
    staleTime: 1000
  })

  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>
          <h3 className='font-semibold text-lg'>My Musics</h3>
          <span className='text-gray-400 text-sm'>Top picks for you. Updated daily</span>
        </div>
        <CreateMusic />
      </div>

      <Separator className='my-2' />
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {isFetching || isLoading
          ? Array.from({ length: 20 }).map((_, index) => <SkeletonLoading key={index} />)
          : data?.element.map((music) => <CardMusic key={music.id} music={music} />)}
      </div>
    </div>
  )
}

export default MusicPage
