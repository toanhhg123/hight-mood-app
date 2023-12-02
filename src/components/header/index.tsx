import logo from '@/assets/logo.svg'
import { cn } from '@/lib/utils'
import { HEIGHT_HEADER } from '@/utils/theme'
import { Bell, LayoutGrid, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import UserMenu from './user-menu'

const Header = () => {
  return (
    <header className={cn(HEIGHT_HEADER, 'fixed border top-0 right-0 left-0 z-50 bg-white')}>
      <div className='flex items-center justify-between container'>
        <Link to={'/'}>
          <img src={logo} alt='logo' className={cn(HEIGHT_HEADER)} />
        </Link>
        <div className='h-full flex items-center gap-4'>
          <Link to={'/'}>
            <Bell className='text-gray-500 w-[20px]' />
          </Link>
          <Link to={'/'}>
            <MessageSquare className='text-gray-500 w-[20px]' />
          </Link>
          <Link to={'/'}>
            <LayoutGrid className='text-gray-500 w-[20px]' />
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
