import HeadFilter from '@/components/admin/dashboard/head-filter'
import { Badge } from '@/components/ui/badge'
import { Book, Music2, User, UserCheck2 } from 'lucide-react'

const Dashboard = () => {
  return (
    <div>
      <HeadFilter />

      <div className='mt-10'>
        <div className='flex gap-2 items-center'>
          <h3 className='text-xl font-medium'>6,890</h3>
          <span>Views</span>
        </div>
        <span className='mt-4 text-sky-700'> Current Month</span>
      </div>

      <div className='mt-10'>
        <div className='flex gap-2 items-center'>
          <h3 className='text-xl font-medium'>1,540</h3>
          <span>Views</span>
        </div>
        <span className='mt-4 text-sky-700'>Current access</span>
      </div>

      <Badge className='text-lg mt-4'>Last Month Summary</Badge>

      <div className='mt-20 flex justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
            <Music2 />
          </div>
          <div>
            <Badge variant={'secondary'}>New Musics</Badge>
            <p className='mt-2 text-lg'>3000</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
            <Book />
          </div>
          <div>
            <Badge variant={'secondary'}>New Albums</Badge>
            <p className='mt-2 text-lg'>1024</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
            <UserCheck2 />
          </div>
          <div>
            <Badge variant={'secondary'}>New Artists</Badge>
            <p className='mt-2 text-lg'>850</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
            <User />
          </div>
          <div>
            <Badge variant={'secondary'}>New Users</Badge>
            <p className='mt-2 text-lg'>5120</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
