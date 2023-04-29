/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import AppError from '../../../shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider'

interface RequestDTO {
  user_id: string
  avatarFilename: string | undefined
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id) // Obtém o usuário do banco de dados com o ID fornecido

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401) // Lança um erro se o usuário não for encontrado
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    await this.storageProvider.saveFile(avatarFilename!)

    user.avatar = avatarFilename!

    await this.usersRepository.save(user)

    return user // Retorna o usuário atualizado
  }
}

export default UpdateUserAvatarService // Exporta a classe do serviço para uso em outros arquivos do aplicativo.
