import CardAlbumMusic from '@/components/admin/music/card-album-update'
import CardMusicImage from '@/components/admin/music/card-music-image'
import CardMusicSrc from '@/components/admin/music/card-music-src'
import CardPremiumMusic from '@/components/admin/music/card-premium-music'
import FormMusicDetails from '@/components/admin/music/form-music-details'
import { Music } from '@/types/music'
import { Album, Crown, Image, LayoutDashboard, PlayCircleIcon } from 'lucide-react'

const music: Music = {
  id: '001',
  name: 'Attention',
  desc: 'by Charlie Puth',
  image:
    'https://spotify-clone-tan-ten.vercel.app/_next/image?url=https%3A%2F%2Fcmhloujijclsmcjvhmwi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-Attention-lm2r9r33&w=3840&q=75',
  src: '',
  authorId: '',
  isPremium: true,
  albumId: '',
  album: {
    id: '',
    name: 'Charlie Put made in VietNam',
    authorId: '',
    desc: '',
    image:
      'https://m.media-amazon.com/images/M/MV5BNzg2YWYzYzMtODU3OC00YjZhLTkyMjctOTU2N2M3MDhiYWRhXkEyXkFqcGdeQXVyOTA1ODU0Mzc@._V1_.jpg'
  }
}

const MusicDetails = () => {
  return (
    <div className='grid lg:grid-cols-5 gap-4 w-full'>
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
      <div className=' col-span-2'>
        <div>
          <div className='flex gap-2 text-lg text-sky-700 font-semibold mb-2'>
            <Image />
            <h3>Main Image</h3>
          </div>
          <CardMusicImage music={music} />
        </div>

        <div className='my-8'>
          <div className='flex gap-2 text-lg text-sky-700 font-semibold mb-2'>
            <PlayCircleIcon />
            <h3>Music Saves</h3>
          </div>
          <CardMusicSrc music={music} />
        </div>
      </div>
    </div>
  )
}

export default MusicDetails
