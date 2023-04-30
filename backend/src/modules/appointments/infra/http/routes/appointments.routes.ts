/* eslint-disable camelcase */
import { Router } from 'express'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)
/*
appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user)
  const appointmentRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentRepository.find()

  return response.json(appointments)
})
*/

export default appointmentsRouter
