import { Router } from 'express'

import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    const { password: _, ...userWithoutPassword } = user // Using object destructuring to remove 'password' property

    return response.json(userWithoutPassword)
  } catch (err) {
    return response.status(400).json({ error: 'Email address already used.' })
  }
})

export default usersRouter
