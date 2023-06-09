import { format, isBefore, parseISO, startOfHour } from 'date-fns';
import * as Yup from 'yup';
import { pt } from 'date-fns/locale';
import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';
import Notification from '../schemas/Notification';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation falis' });
    }

    // eslint-disable-next-line camelcase
    const { provider_id, date } = req.body;

    const isProvider = await User.findOne({
      // eslint-disable-next-line camelcase
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'You can only create appointment' });
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const checkAvailabilty = await Appointment.findOne({
      where: {
        // eslint-disable-next-line camelcase
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailabilty) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not availability' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      // eslint-disable-next-line camelcase
      provider_id,
      date,
    });

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mn'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      // eslint-disable-next-line camelcase
      user: provider_id,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
