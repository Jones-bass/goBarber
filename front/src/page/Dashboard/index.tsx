import { FiPower } from 'react-icons/fi'
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

          <Section>
            <strong>Manhã</strong>
          </Section>

          <Section>
            <strong>Tarde</strong>
          </Section>
        </Schedule>
      </Content>
    </Container>
  )
}
