import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    const { password: _, ...userWithoutPassword } = user // Using object destructuring to remove 'password' property

    return response.json({ userWithoutPassword, token })
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'Incorrect email/password combination.' })
  }
})

export default sessionsRouter
