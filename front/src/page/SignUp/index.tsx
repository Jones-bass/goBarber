import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logo from '../../assets/logo.svg'

import { Container, Content, AnimationContainer, Background } from './styles'

const SignUp = () => {
  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <form>
            <h1>Faça seu cadastro</h1>

            <Input name="name" placeholder="Nome" icon={FiUser} />
            <Input name="email" placeholder="E-mail" icon={FiMail} />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Button type="submit">Cadastrar</Button>
          </form>

          <a href="#">
            <FiArrowLeft />
            Voltar para logon
          </a>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
