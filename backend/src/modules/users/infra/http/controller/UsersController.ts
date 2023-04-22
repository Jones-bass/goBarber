import { Request, Response } from 'express'
import UsersRepository from '../../typeorm/repositories/UsersRepository'
import CreateUserService from '../../../services/CreateUserService'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()

    const createUser = new CreateUserService(usersRepository)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    const { password: _, ...users } = user // Using object destructuring to remove 'password' property

    return response.json(users)
  }
}
