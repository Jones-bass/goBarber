import { Request, Response } from 'express'

import UsersRepository from '../../typeorm/repositories/UsersRepository'
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService'
import DiskStorageProvider from '../../../../../shared/container/providers/StorageProvider/implementations/DiskStorageProvider'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository()
    const storageProvider = new DiskStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      storageProvider,
    )

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    })

    return response.json(user)
  }
}
