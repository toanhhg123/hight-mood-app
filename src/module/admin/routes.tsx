import { Album, LucideLayout, Music, Music2, User2, UserCheck2, UserCircle2Icon } from 'lucide-react'
import Dashboard from './pages/dashboard'
import MusicPage from './pages/music'
import MusicDetails from './pages/music-details'
import Users from './pages/user'
import AlbumPageAdmin from './pages/album'
import Profile from './pages/profile'
import MyMusic from './pages/my-music'
import Singers from './pages/singer'

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
    href: '/admin/my-music',
    icon: <Music2 className='w-5' />,
    label: 'My Music',
    element: <MyMusic />
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
    label: 'Profile',
    element: <Profile />
  },
  {
    href: '/admin/singers',
    icon: <UserCircle2Icon className='w-5' />,
    label: 'Singers',
    element: <Singers />
  },
  {
    href: '/admin/music/details/:id',
    icon: <UserCheck2 className='w-5' />,
    label: 'Artist',
    element: <MusicDetails />,
    hidden: true
  },
  {
    href: '/admin/album',
    icon: <Album className='w-5' />,
    label: 'Album',
    element: <AlbumPageAdmin />
  }
]
