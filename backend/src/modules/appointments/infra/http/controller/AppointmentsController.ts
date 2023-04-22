/* eslint-disable camelcase */
import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import CreateAppointmentService from '../../../services/CreateAppointmentService'
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body

    const appointmentsRepository = new AppointmentsRepository()

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    )

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    })

    return response.json(appointment)
  }
}
