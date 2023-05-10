import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logo from '../../assets/logo1.svg'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { Container, Content, AnimationContainer, Background } from './styles'
import { useAuth } from '../../hooks/auth'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Loading } from '../../components/Loading'

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
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { signIn } = useAuth()

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = createUserForm

  const handleOnSubmit = useCallback(
    async (data: CreateUserData) => {
      try {
        setLoading(true)
        await signIn({ ...data })

        navigate('/dashboard')
        if (data !== undefined) {
          toast.success('Usuário Logado.')
        }
      } catch {
        toast.error('Ocorreu um erro ao fazer login, cheque as credenciais.')
        setLoading(false)
      }
    },

    [signIn, navigate],
  )

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
                {loading ? <Loading /> : 'Entrar'}
              </Button>

              <a href="#">Esqueci minha senha</a>
            </form>
          </FormProvider>

          <Link to="/cadastro">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}
