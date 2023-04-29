/* eslint-disable no-useless-constructor */
import { addHours, isAfter } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '../../../shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'
import IUsersTokensRepository from '../repositories/IUsersTokensRepository'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUsersTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User does not exists!.')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists!.')
    }

    const tokenCreatdAt = userToken.created_at
    const compareDate = addHours(tokenCreatdAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired!.')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}

export default ResetPasswordService
