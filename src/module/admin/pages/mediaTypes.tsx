import CardMediaType from '@/components/admin/media-type/card-media'
import CreateMediaType from '@/components/admin/media-type/create-media-type'
import SkeletonLoading from '@/components/skeleton-loading'
import { Separator } from '@/components/ui/separator'
import mediaTypeService from '@/services/mediaType.service'
import { useQuery } from 'react-query'

const MediaPagesAdmin = () => {
  const { isFetching, isLoading, data } = useQuery({
    queryKey: ['mediaTypes'],
    queryFn: mediaTypeService.getMediaTypes
  })

  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>
          <h3 className='font-semibold text-lg'>Media Types</h3>
          <span className='text-gray-400 text-sm'>Top picks for you. Updated daily</span>
        </div>
        <CreateMediaType />
      </div>

      <Separator className='my-2' />
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {isFetching || isLoading
          ? Array.from({ length: 20 }).map((_, index) => <SkeletonLoading key={index} />)
          : data?.element.rows.map((mediaType) => <CardMediaType key={mediaType.id} mediaType={mediaType} />)}
      </div>
    </div>
  )
}

export default MediaPagesAdmin
