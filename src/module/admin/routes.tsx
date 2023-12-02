import { LucideLayout, Music, User2, UserCheck2 } from 'lucide-react'
import Dashboard from './pages/dashboard'
import MusicPage from './pages/music'
import MusicDetails from './pages/music-details'
import Users from './pages/user'

export default [
  {
    href: '/admin/dashboard',
    icon: <LucideLayout className='w-5' />,
    label: 'Dashboard',
    element: <Dashboard />
  },
  {
    href: '/admin/music',
    icon: <Music className='w-5' />,
    label: 'Music',
    element: <MusicPage />
  },
  {
    href: '/admin/user',
    icon: <User2 className='w-5' />,
    label: 'User',
    element: <Users />
  },
  {
    href: '/admin/artist',
    icon: <UserCheck2 className='w-5' />,
    label: 'Artist',
    element: <Dashboard />
  },
  {
    href: '/admin/music/details/:id',
    icon: <UserCheck2 className='w-5' />,
    label: 'Artist',
    element: <MusicDetails />,
    hidden: true
  }
]
