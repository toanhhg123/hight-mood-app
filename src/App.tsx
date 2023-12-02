import { Route, Routes } from 'react-router-dom'
import Layout from './module/admin/layout'
import adminRoutes from './module/admin/routes'
import Login from './module/admin/pages/login'
const App = () => {
  return (
    <Routes>
      <Route path='' element={<h1>app</h1>}></Route>
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
