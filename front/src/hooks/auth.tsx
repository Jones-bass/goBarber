import React, { useCallback, useContext, createContext, useState } from 'react'
import { api } from '../services/api'

interface AuthState {
  token: string
  users: object
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  users: object
  signOut(): void
  signIn(credentials: SignInCredentials): Promise<void>
}

export interface IAuthContextData {
  children: React.ReactNode
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: IAuthContextData) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const usersString = localStorage.getItem('@GoBarber:users') // Fix the key here
    if (token && usersString) {
      const users = JSON.parse(usersString)
      return { token, users }
    }
    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', { email, password })
    const { token, users } = response.data
    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:users', JSON.stringify(users))
    setData({ token, users })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:users')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ users: data.users, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within an AuthProvider')

  return context
}
