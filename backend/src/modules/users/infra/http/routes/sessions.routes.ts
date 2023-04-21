import { Router } from 'express'
import AuthenticateUserService from '../../../services/AuthenticateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const usersRepository = new UsersRepository()
  const authenticateUser = new AuthenticateUserService(usersRepository)

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  })

  const { password: _, ...users } = user // Using object destructuring to remove 'password' property

  return response.json({ users, token })
})

export default sessionsRouter
