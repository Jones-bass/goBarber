import { Request, Response } from 'express'
import ResetPasswordService from '../../../services/ResetPasswordService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider'
import UsersTokensRepository from '../../typeorm/repositories/UserTokensRepository'

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const userTokensRepository = new UsersTokensRepository()
    const usersRepository = new UsersRepository()
    const hashProvider = new BCryptHashProvider()

    const resetPassword = new ResetPasswordService(
      usersRepository,
      userTokensRepository,
      hashProvider,
    )

    await resetPassword.execute({
      password,
      token,
    })

    return response.status(204).json()
  }
}
