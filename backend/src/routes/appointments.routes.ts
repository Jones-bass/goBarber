import { isEqual, parseISO, startOfHour } from "date-fns";
import { Router } from "express";
import { uuid } from "uuidv4";

const appointmentsRouter = Router();

interface AppointmentProps {
  id: string
  provider: string
  date: Date
}

const appointments: AppointmentProps[] = [];

appointmentsRouter.post('/', (request, response) => {
  const {provider, date } = request.body
  
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment => 
    isEqual(parsedDate, appointment.date),);

  if (findAppointmentInSameDate) {
    return response
    .status(400)
    .json({ message: "This appointment is already booked"})
  }
  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate
  }

  appointments.push(appointment)

  return response.json(appointment)
})

export default appointmentsRouter