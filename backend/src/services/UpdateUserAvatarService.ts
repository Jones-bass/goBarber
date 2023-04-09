/* eslint-disable camelcase */
import { getRepository } from 'typeorm'
import uploadConfig from '../config/upload'
import User from '../models/User'
import fs from 'fs/promises' // Importa a API de promessas do módulo 'fs'
import path from 'path'

interface RequestDTO {
  user_id: string
  avatarFilename: string | undefined
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User) // Obtém o repositório de usuários do TypeORM

    const user = await usersRepository.findOne(user_id) // Obtém o usuário do banco de dados com o ID fornecido

    if (!user) {
      throw new Error('Only authenticated users can change avatar.') // Lança um erro se o usuário não for encontrado
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

    await usersRepository.save(user) // Salva a atualização no banco de dados

    return user // Retorna o usuário atualizado
  }
}

export default UpdateUserAvatarService // Exporta a classe do serviço para uso em outros arquivos do aplicativo.
