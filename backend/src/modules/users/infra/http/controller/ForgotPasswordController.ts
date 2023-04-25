import { Request, Response } from 'express'
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'
import EtherealMailProvider from '../../../../../shared/providers/MailProvider/implementations/EtherealMailProvider'
import UsersTokensRepository from '../../typeorm/repositories/UserTokensRepository'

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const usersRepository = new UsersRepository()
    const userTokensRepository = new UsersTokensRepository()
    const mailProvider = new EtherealMailProvider()

    const authenticateUser = new SendForgotPasswordEmailService(
      usersRepository,
      mailProvider,
      userTokensRepository,
    )

    await authenticateUser.execute({
      email,
    })

    return response.status(204).json()
  }
}
