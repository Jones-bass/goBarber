import React, { useCallback, useContext, createContext } from 'react'
import { api } from '../services/api'

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
}

export interface IAuthContextData {
  children: React.ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: IAuthContextData) => {
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', { email, password })
    console.log(response.data)
  }, [])

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}
