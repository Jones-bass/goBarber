import { FiPower } from 'react-icons/fi'
import logo from '../../assets/logo.svg'

import {
  Container,
  Header,
  HeaderContent,
  Content,
  Schedule,
  Section,
} from './styles'

export const Dashboard = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <button type="button">
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
