import { Request, Response } from 'express'
import UsersRepository from '../../typeorm/repositories/UsersRepository'
import CreateUserService from '../../../services/CreateUserService'
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()
    const hashProvider = new BCryptHashProvider()

    const createUser = new CreateUserService(usersRepository, hashProvider)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    const { password: _, ...users } = user // Using object destructuring to remove 'password' property

    return response.json(users)
  }
}
