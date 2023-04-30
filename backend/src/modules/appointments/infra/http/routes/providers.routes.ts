import { Router } from 'express'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'

import ProviderDayAvailabilityController from '../controller/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controller/ProviderMonthAvailabilityController'
import ProvidersController from '../controller/ProvidersController'

const providersRouter = Router()
const providersController = new ProvidersController()

const providerDayAvailabilityController =
  new ProviderDayAvailabilityController()
const providerMonthAvailabilityController =
  new ProviderMonthAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersController.index)
providersRouter.get(
  '/:id/month-availability',
  providerMonthAvailabilityController.index,
)
providersRouter.get(
  '/:id/day-availability',
  providerDayAvailabilityController.index,
)

export default providersRouter
