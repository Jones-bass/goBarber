import { FiLogIn } from 'react-icons/fi'

import logo from '../../assets/logo1.svg'

import { Container, Content, AnimationContainer, Background } from './styles'

export function SignIn() {
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <form>
            <h1>Faça seu logon</h1>

            <input name="email" placeholder="E-mail" />
            <input name="password" type="password" placeholder="Senha" />
            <button type="submit">Entrar</button>

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
