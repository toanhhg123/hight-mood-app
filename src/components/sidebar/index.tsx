import { cn } from '@/lib/utils'
import { WIDTH_SIDE_BAR } from '@/utils/theme'
import SideBarItem, { ISidebarItem } from './sidebar-item'

interface Props {
  items: ISidebarItem[]
}

const SideBar = ({ items }: Props) => {
  return (
    <div className={cn(WIDTH_SIDE_BAR, 'z-30 min-h-screen flex-shrink-0 border-r py-6')}>
      <div className='flex flex-col'>
        {items.map((route) => (
          <SideBarItem key={route.href} {...route} />
        ))}
      </div>
    </div>
  )
}

export default SideBar
