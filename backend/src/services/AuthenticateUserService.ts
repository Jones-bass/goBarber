import { compare } from 'bcryptjs'
import User from '../models/User'
import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'

interface RequestDTO {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    const token = sign({}, '24b72da99b2c97349248e8af7deb4c2b', {
      subject: user.id,
      expiresIn: '1d',
    })
    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService
