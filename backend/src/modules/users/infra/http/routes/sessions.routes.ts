import { Router } from 'express'
import AuthenticateUserService from '../../../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService()

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  })

  const { password: _, ...users } = user // Using object destructuring to remove 'password' property

  return response.json({ users, token })
})

export default sessionsRouter
