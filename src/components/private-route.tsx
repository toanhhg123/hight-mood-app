import useAuth from '@/hooks/useAuth'
import { ERole } from '@/types/user'
import { ReactNode, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

interface Props {
  roles: ERole[]
  children: ReactNode
}

const PrivateRouter = ({ roles, children }: Props) => {
  const { userDetails, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (userDetails && roles.length && !roles.find((role) => role === userDetails.roleCode)) {
      navigate('/403')
    }
  }, [userDetails, navigate, roles])

  return !token ? <Navigate to={'/login'} /> : children
}

export default PrivateRouter
