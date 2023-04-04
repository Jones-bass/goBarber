import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logo from '../../assets/logo1.svg'

import { Container, Content, AnimationContainer, Background } from './styles'
import Button from '../../components/Button'
import Input from '../../components/Input'

export function SignIn() {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <form>
            <h1>Faça seu logon</h1>

            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Button type="submit">Entrar</Button>

            <a href="#">Esqueci minha senha</a>
          </form>

          <a href="#">
            <FiLogIn />
            Criar conta
          </a>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}
