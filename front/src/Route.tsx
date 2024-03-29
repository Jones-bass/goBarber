import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/auth'
import React from 'react'
import { SignIn } from './page/SignIn'
import { SignUp } from './page/SignUp'
import { Dashboard } from './page/Dashboard'
import { ResetPassword } from './page/ResetPassword'
import { ForgotPassword } from './page/ForgotPassword'

interface PrivateProps {
  children?: React.ReactNode
}

export function Router() {
  const PrivateRoute = ({ children }: PrivateProps) => {
    const { user } = useAuth()

    if (user) {
      return <>{children}</>
    } else {
      return <Navigate to="/" />
    }
  }

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
