import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export interface ISidebarItem {
  href: string
  icon: ReactNode
  label: string
}

const SideBarItem = ({ href, icon, label }: ISidebarItem) => {
  const { pathname } = useLocation()
  const isActive = href === pathname || pathname.startsWith(href)

  return (
    <Link
      to={href}
      className={cn(
        'flex items-center text-sm text-gray-500 font-medium  gap-x-2  p-3 mx-1 rounded-sm',
        isActive && 'text-gray-700 bg-gray-400/10 font-semibold'
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default SideBarItem
