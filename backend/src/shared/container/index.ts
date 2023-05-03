import { container } from 'tsyringe'

import './providers'
import '../../modules/users/providers'

import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '../../modules/users/repositories/IUsersRepository'

import AppointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository'

import UsersTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository'
import IUsersTokensRepository from '../../modules/users/repositories/IUsersTokensRepository'

import NotificationsRepository from '../../modules/notifications/infra/typeorm/repositories/NotificationsRepository'
import INotificationsRepository from '../../modules/notifications/repositories/INotificationsRepository'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',
  UsersTokensRepository,
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
)
