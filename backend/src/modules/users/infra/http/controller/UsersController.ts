import { container } from 'tsyringe'

import { Request, Response } from 'express'
import CreateUserService from '../../../services/CreateUserService'
import { classToClass } from 'class-transformer'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    return response.json(classToClass(user))
  }
}
