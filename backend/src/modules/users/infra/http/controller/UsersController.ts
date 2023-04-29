import { container } from 'tsyringe'

import { Request, Response } from 'express'
import CreateUserService from '../../../services/CreateUserService'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete (user as { password?: string }).password

    return response.json(user)
  }
}
