import { useCallback, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'

import { Link, useNavigate } from 'react-router-dom'

import logo from '../../assets/logo.svg'

import { Container, Content, AnimationContainer, Background } from './styles'
import { toast } from 'react-toastify'
import { api } from '../../services/api'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
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
})

type CreateUserData = z.infer<typeof createUserSchema>

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createUserForm

  const handleOnSubmit = useCallback(
    async (data: CreateUserData) => {
      try {
        setLoading(true)

        await api.post('/password/forgot', { ...data })

        navigate('/reset-password')
        toast.success('E-mail de recuperação de senha enviado.')
      } catch {
        toast.error('Ocorreu um erro ao enviar o email, tente novamente!')

        setLoading(false)
      }
    },

    [navigate],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <FormProvider {...createUserForm}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <h1>Recuperar senha</h1>

              <Input
                name="email"
                placeholder="E-mail"
                icon={FiMail}
                errorMessage={errors?.email?.message ?? ''}
              />

              <Button type="submit">
                {loading ? <Loading /> : 'Recuperar senha'}
              </Button>
            </form>
          </FormProvider>

          <Link to="/">
            <FiLogIn />
            Voltar
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}
