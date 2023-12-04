import authService from '@/services/auth.service'
import { User } from '@/types/user'
import localStore from '@/utils/localstore'
import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'

export interface UserLogin {
  token?: string
  userDetails?: User
  loginSuccess: (token: string) => void
  logout: () => void
}

export const KEY_AUTH_LOCAL = '__AUTH__'

export const AuthContext = createContext<UserLogin>({ loginSuccess: () => {}, logout() {} })

interface Props {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    token: localStore.getStringLocal(KEY_AUTH_LOCAL) || undefined,
    loginSuccess: (token: string) => {
      localStorage.setItem(KEY_AUTH_LOCAL, token)
      setUserLogin({ ...userLogin, token })
    },
    logout: () => {
      localStorage.removeItem(KEY_AUTH_LOCAL)
      setUserLogin((pre) => ({ ...pre, token: '' }))
    }
  })

  const getUserInit = useCallback(async () => {
    try {
      const token = userLogin.token
      if (!token) throw Error()

      const user = await authService.getMe()

      setUserLogin((pre) => ({ ...pre, token, userDetails: user.element }))
    } catch (error) {
      localStorage.removeItem(KEY_AUTH_LOCAL)
      setUserLogin(({ loginSuccess: handleLoginSuccess, logout }) => ({ loginSuccess: handleLoginSuccess, logout }))
    }
  }, [userLogin.token])

  useEffect(() => {
    getUserInit()
  }, [getUserInit])

  return <AuthContext.Provider value={userLogin}>{children}</AuthContext.Provider>
}
