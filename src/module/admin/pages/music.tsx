import CardMusic from '@/components/admin/music/card-music'
import CreateMusic from '@/components/admin/music/create-music'
import { Separator } from '@/components/ui/separator'
import { Music } from '@/types/music'

const musics: Music[] = [
  {
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
  },
  {
    id: '002',
    name: 'Anti Hero',
    desc: 'by Charlie Puth',
    image:
      'https://spotify-clone-tan-ten.vercel.app/_next/image?url=https%3A%2F%2Fcmhloujijclsmcjvhmwi.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fimage-Anti%2520Hero-lm2r8y91&w=3840&q=75',
    src: '',
    authorId: '',
    isPremium: false,
    albumId: ''
  }
]

const MusicPage = () => {
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
        {musics.map((music) => (
          <CardMusic key={music.id} music={music} />
        ))}
      </div>
    </div>
  )
}

export default MusicPage
