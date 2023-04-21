/* eslint-disable camelcase */
import { parseISO } from 'date-fns'
import { Router } from 'express'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'
import CreateAppointmentService from '../../../services/CreateAppointmentService'
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'

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

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const appointmentsRepository = new AppointmentsRepository()

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(appointmentsRepository)

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  })

  return response.json(appointment)
})

export default appointmentsRouter
