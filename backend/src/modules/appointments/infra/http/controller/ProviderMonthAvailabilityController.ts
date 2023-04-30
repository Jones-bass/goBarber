/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProvidersMonthAvailabilityService from '../../../../users/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.query

    const listProviderMonthAvailabilityService = container.resolve(
      ListProvidersMonthAvailabilityService,
    )

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    })

    return response.json(availability)
  }
}
