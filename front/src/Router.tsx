import { Route, Routes } from 'react-router-dom'
import { SignIn } from './page/SignIn'
import { SignUp } from './page/SignUp'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/cadastro" element={<SignUp />} />
    </Routes>
  )
}
