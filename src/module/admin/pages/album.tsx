import CardAlbum from '@/components/album/card-album'
import CreateAlbum from '@/components/album/create-album'
import SkeletonLoading from '@/components/skeleton-loading'
import { Separator } from '@/components/ui/separator'
import albumService from '@/services/album.service'
import { useQuery } from 'react-query'

const AlbumPageAdmin = () => {
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ['album'],
    queryFn: albumService.getMyAlbum
  })

  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>
          <h3 className='font-semibold text-lg'>My Album</h3>
          <span className='text-gray-400 text-sm'>Top picks for you. Updated daily</span>
        </div>
        <CreateAlbum />
      </div>

      <Separator className='my-2' />
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {isFetching || isLoading
          ? Array.from({ length: 20 }).map((_, index) => <SkeletonLoading key={index} />)
          : data?.element.map((album) => <CardAlbum key={album.id} album={album} />)}
      </div>
    </div>
  )
}

export default AlbumPageAdmin
