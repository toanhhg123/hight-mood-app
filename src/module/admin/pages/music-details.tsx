import CardAlbumMusic from '@/components/music/card-album-update'
import CardMusicImage from '@/components/music/card-music-image'
import CardMusicSrc from '@/components/music/card-music-src'
import CardPremiumMusic from '@/components/music/card-premium-music'
import DeleteMusic from '@/components/music/delete-music'
import FormMusicDetails from '@/components/music/form-music-details'
import SkeletonLoading from '@/components/skeleton-loading'
import { handleToastError } from '@/lib'
import mediaService from '@/services/media.service'
import { Album, Crown, Image, LayoutDashboard, PlayCircleIcon } from 'lucide-react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

const MusicDetails = () => {
  const { id } = useParams()

  const { isLoading, data } = useQuery({
    queryKey: ['music-details', id],
    queryFn: () => mediaService.findById(id!),
    onError: (error) => {
      handleToastError(error)
    },
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: false
  })

  if (isLoading)
    return (
      <div className='h-screen'>
        <SkeletonLoading />
      </div>
    )
  const music = data?.element
  if (music)
    return (
      <div className='grid lg:grid-cols-6 gap-4 w-full h-max mb-20 my-10'>
        <div className='col-span-3'>
          <div>
            <div className='flex gap-2 text-lg text-sky-700 font-semibold mb-2'>
              <Image />
              <h3>Main Image</h3>
            </div>
            <CardMusicImage music={music} />
          </div>

          <div className='my-4'>
            <div className='flex gap-2 text-lg text-sky-700 font-semibold mb-2'>
              <PlayCircleIcon />
              <h3>Music Saves</h3>
            </div>
            <CardMusicSrc music={music} />
          </div>

          <div className='my-4'>
            <DeleteMusic media={music} />
          </div>
        </div>
        <div className='col-span-3 flex flex-col gap-6'>
          <div>
            <div className='flex gap-2 text-lg text-sky-700 font-semibold mb-4'>
              <LayoutDashboard />
              <h3>Update Music Information</h3>
            </div>
            <FormMusicDetails music={music} />
          </div>

          <div>
            <div className='flex gap-2 text-lg text-sky-700 font-semibold mb-4'>
              <Album />
              <h3>Album Music</h3>
            </div>
            <CardAlbumMusic music={music} />
          </div>

          <div>
            <div className='flex gap-2 text-lg text-sky-700 font-semibold mb-4'>
              <Crown />
              <h3>Premium Advanced</h3>
            </div>
            <CardPremiumMusic music={music} />
          </div>
        </div>
      </div>
    )
}

export default MusicDetails
