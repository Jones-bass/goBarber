/* eslint-disable camelcase */
import { Router } from 'express'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsController from '../controller/AppointmentsController'
import ProviderAppointmentsController from '../controller/ProviderAppointmentsController'

const appointmentsRouter = Router()

const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.create)
appointmentsRouter.get('/schedule', providerAppointmentsController.index)

export default appointmentsRouter
