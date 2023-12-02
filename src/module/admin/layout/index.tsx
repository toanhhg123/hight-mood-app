import Header from '@/components/header'
import SideBar from '@/components/sidebar'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Outlet } from 'react-router-dom'
import routes from '../routes'

const Layout = () => {
  return (
    <>
      <Header />
      <div className='mt-16 flex'>
        {/* side bar */}
        <SideBar items={routes.filter((route) => !route.hidden)} />
        <ScrollArea className='mt-4 h-screen container flex-1'>
          <Outlet />
        </ScrollArea>
      </div>
    </>
  )
}

export default Layout
