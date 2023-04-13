import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logo from '../../assets/logo1.svg'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Content, AnimationContainer, Background } from './styles'
import { useAuth } from '../../hooks/auth'

const createUserSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Formato de e-mail inválido',
    })
    .toLowerCase(),
  password: z
    .string()
    .nonempty({
      message: 'A senha é obrigatória',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caracteres',
    }),
})

type CreateUserData = z.infer<typeof createUserSchema>

export function SignIn() {
  const { signIn } = useAuth()

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = createUserForm

  const handleOnSubmit = async (data: CreateUserData) => {
    signIn(data)
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <FormProvider {...createUserForm}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <h1>Faça seu logon</h1>

              <Input
                name="email"
                placeholder="E-mail"
                icon={FiMail}
                errorMessage={errors?.email?.message ?? ''}
              />
              <Input
                name="password"
                type="password"
                placeholder="Senha"
                icon={FiLock}
                errorMessage={errors?.password?.message ?? ''}
              />
              <Button disabled={isSubmitting} type="submit">
                Entrar
              </Button>

              <a href="#">Esqueci minha senha</a>
            </form>
          </FormProvider>

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
