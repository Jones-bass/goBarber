import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../../config/upload'
import CreateUserService from '../../../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()

    const createUser = new CreateUserService(usersRepository)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    const { password: _, ...users } = user // Using object destructuring to remove 'password' property

    return response.json(users)
  } catch (err) {
    return response.status(400).json({ error: 'Email address already used.' })
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository()

    const updateUserAvatar = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    })

    return response.json(user)
  },
)

export default usersRouter
