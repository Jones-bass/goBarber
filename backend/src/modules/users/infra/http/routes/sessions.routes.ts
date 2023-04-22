import { Router } from 'express'
import SessionsController from '../controller/SessionsController'

const sessionsRouter = Router()
const sessionController = new SessionsController()
sessionsRouter.post('/', sessionController.create)
export default sessionsRouter
