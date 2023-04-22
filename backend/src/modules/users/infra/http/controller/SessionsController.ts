import { Request, Response } from 'express'
import AuthenticateUserService from '../../../services/AuthenticateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const authenticateUser = new AuthenticateUserService(usersRepository)

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    })

    const { password: _, ...users } = user // Using object destructuring to remove 'password' property

    return response.json({ users, token })
  }
}
