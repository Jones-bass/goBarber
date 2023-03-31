import { startOfDay } from 'date-fns'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentReposytory: AppointmentsRepository) {
    this.appointmentsRepository = appointmentReposytory
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfDay(date)

    const findAppointmentInSameDate =
      this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
