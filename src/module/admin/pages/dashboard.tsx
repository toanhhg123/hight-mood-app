import HeadFilter from '@/components/admin/dashboard/head-filter'
import { Badge } from '@/components/ui/badge'
import reportService from '@/services/report.service'
import { Book, Music2, User, UserCheck2 } from 'lucide-react'
import { useQuery } from 'react-query'

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ['music'],
    queryFn: reportService.get
  })

  const report = data?.element

  return (
    <div>
      <HeadFilter />

      {report ? (
        <div>
          <div className='mt-10'>
            <div className='flex gap-2 items-center'>
              <h3 className='text-xl font-medium'>{report.favoriteCount}</h3>
              <span>Views</span>
            </div>
            <span className='mt-4 text-sky-700'> Total Favorite</span>
          </div>

          <div className='mt-10'>
            <div className='flex gap-2 items-center'>
              <h3 className='text-xl font-medium'>{report.historyCount}</h3>
              <span>Views</span>
            </div>
            <span className='mt-4 text-sky-700'>Current views</span>
          </div>

          <Badge className='text-lg mt-4'>Last Month Summary</Badge>

          <div className='mt-20 flex justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
                <Music2 />
              </div>
              <div>
                <Badge variant={'secondary'}>New Musics</Badge>
                <p className='mt-2 text-lg'>{report.mediaCount}</p>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
                <Book />
              </div>
              <div>
                <Badge variant={'secondary'}>New Albums</Badge>
                <p className='mt-2 text-lg'>{report.albumCount}</p>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
                <UserCheck2 />
              </div>
              <div>
                <Badge variant={'secondary'}>New Artists</Badge>
                <p className='mt-2 text-lg'>{report.singerCount}</p>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 rounded-full border flex items-center justify-center'>
                <User />
              </div>
              <div>
                <Badge variant={'secondary'}>New Users</Badge>
                <p className='mt-2 text-lg'>{report.userCount}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>Not found Report</h3>
      )}
    </div>
  )
}

export default Dashboard
