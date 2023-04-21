/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import uploadConfig from '../../../config/upload'
import fs from 'fs/promises' // Importa a API de promessas do módulo 'fs'
import path from 'path'
import User from '../infra/typeorm/entities/User'
import AppError from '../../../shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface RequestDTO {
  user_id: string
  avatarFilename: string | undefined
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id) // Obtém o usuário do banco de dados com o ID fornecido

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401) // Lança um erro se o usuário não for encontrado
    }

    if (user.avatar) {
      // Verifica se o usuário já possui um avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar) // Obtém o caminho completo do arquivo de avatar do usuário
      const userAvatarFileExists = await fs.stat(userAvatarFilePath) // Verifica se o arquivo existe

      if (userAvatarFileExists) {
        // Se o arquivo existe, remove-o
        await fs.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename as string // Atualiza o nome do arquivo de avatar do usuário com o nome fornecido

    await this.usersRepository.save(user) // Salva a atualização no banco de dados

    return user // Retorna o usuário atualizado
  }
}

export default UpdateUserAvatarService // Exporta a classe do serviço para uso em outros arquivos do aplicativo.