import { Link, Route, Routes } from 'react-router-dom'
import Layout from './module/admin/layout'
import Login from './module/admin/pages/login'
import adminRoutes from './module/admin/routes'
import PrivateRouter from './components/private-route'
import { buttonVariants } from './components/ui/button'
const App = () => {
  return (
    <Routes>
      <Route
        path=''
        element={
          <PrivateRouter roles={[]}>
            <div className='flex h-screen items-center justify-center gap-10'>
              <Link className={buttonVariants()} to={'/admin/dashboard'}>
                Dashboard Admin
              </Link>
            </div>
          </PrivateRouter>
        }
      ></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/admin' element={<Layout />}>
        {adminRoutes.map(({ href, element }) => (
          <Route key={href} path={href} element={element} />
        ))}
      </Route>
    </Routes>
  )
}

export default App
