/* eslint-disable camelcase */
import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProvidersAppointmentsService from '../../../services/ListProviderAppointmentsService'

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id
    const { day, month, year } = request.query

    const listProviderAppointments = container.resolve(
      ListProvidersAppointmentsService,
    )

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    })

    return response.json(classToClass(appointments))
  }
}
