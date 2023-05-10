import { FiClock, FiPower } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  HeaderContent,
  Content,
  Schedule,
  Section,
  Profile,
  NextAppointment,
  Appointment,
} from './styles'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const { user, signOut } = useAuth()

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
            <span>Hoje</span>
            <span>Data</span>
            <span>Dia</span>
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
      </Content>
    </Container>
  )
}
