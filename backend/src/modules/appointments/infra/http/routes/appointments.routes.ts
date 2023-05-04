/* eslint-disable camelcase */
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsController from '../controller/AppointmentsController'
import ProviderAppointmentsController from '../controller/ProviderAppointmentsController'

const appointmentsRouter = Router()

const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
)
appointmentsRouter.get('/schedule', providerAppointmentsController.index)

export default appointmentsRouter
