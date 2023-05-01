/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProvidersAppointmentsService from '../../../services/ListProviderAppointmentsService'

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id
    const { day, month, year } = request.body

    const listProviderAppointments = container.resolve(
      ListProvidersAppointmentsService,
    )

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    })

    return response.json(appointments)
  }
}
