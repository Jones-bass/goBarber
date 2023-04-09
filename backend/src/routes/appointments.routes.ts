/* eslint-disable camelcase */
import { parseISO } from 'date-fns'
import { Router } from 'express'

import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { getCustomRepository } from 'typeorm'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user)
  const appointmentRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    })

    return response.json(appointment)
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked' })
  }
})

export default appointmentsRouter
