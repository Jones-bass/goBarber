import { parseISO } from 'date-fns'
import { Router } from 'express'

import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRouter = Router()
const appointmentRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all()

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    )

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    })

    return response.json(appointment)
  } catch (err) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked' })
  }
})

export default appointmentsRouter
