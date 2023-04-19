/* eslint-disable camelcase */
import { parseISO } from 'date-fns'
import { Router } from 'express'

import { getCustomRepository } from 'typeorm'
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '../../../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user)
  const appointmentRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  })

  return response.json(appointment)
})

export default appointmentsRouter
