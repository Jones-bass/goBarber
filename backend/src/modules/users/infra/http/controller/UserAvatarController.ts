import { Request, Response } from 'express'

import UsersRepository from '../../typeorm/repositories/UsersRepository'
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository()

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    })

    return response.json(user)
  }
}
