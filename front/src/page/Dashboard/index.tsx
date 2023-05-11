import { FiClock, FiPower } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import {
  Container,
  HeaderContent,
  Header,
  Content,
  Schedule,
  Section,
  Profile,
  NextAppointment,
  Appointment,
  Calender,
} from './styles'
import { Link } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../../services/api'
import { format, isToday, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

interface Appointments {
  id: string
  date: string
  hourFormatted: string
  user: {
    name: string
    avatar_url: string
  }
}

export const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([])

  const [appointments, setAppointments] = useState<Appointments[]>([])

  const { user, signOut } = useAuth()

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data)
      })
  }, [currentMonth, user.id])

  useEffect(() => {
    api
      .get<Appointments[]>('/appointments/schedule', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAppointments(response.data)
        console.log(response.data)
      })
  }, [selectedDate])

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })

    return dates
  }, [currentMonth, monthAvailability])

  const selectedDateAsText = useMemo(() => {
    return format(
      selectedDate,
      "'Dia' dd 'de' MMMM",
      {
        locale: ptBR,
      },
      [selectedDate],
    )
  })

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    })
  }, [selectedDate])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Agendamento a seguir</strong>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/85463497?v=4"
                alt="Profile avatar"
              />

              <strong>Jones Bass</strong>
              <span>
                <FiClock />
                14:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/85463497?v=4"
                  alt="Profile avatar"
                />

                <strong>Jones Souza</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                15:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/85463497?v=4"
                  alt="Profile avatar"
                />

                <strong>Jones Souza</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calender>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calender>
      </Content>
    </Container>
  )
}
