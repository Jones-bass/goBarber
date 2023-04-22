/* eslint-disable no-useless-constructor */
import AppError from '../../../shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '../../../shared/providers/MailProvider/models/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

class SendForgotPasswordEmailService {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists!.')
    }

    await this.userTokensRepository.generate(user.id)

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
  }
}

export default SendForgotPasswordEmailService
