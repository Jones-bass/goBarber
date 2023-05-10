/* eslint-disable camelcase */
import { FiLock } from 'react-icons/fi'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useForm, FormProvider } from 'react-hook-form'

import logo from '../../assets/logo.svg'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Content, AnimationContainer, Background } from './styles'
import { useState } from 'react'
import { api } from '../../services/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loading } from '../../components/Loading'

const createUserSchema = z.object({
  password: z
    .string()
    .nonempty({
      message: 'A senha é obrigatória',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caracteres',
    }),
  password_confirmation: z
    .string()
    .nonempty({
      message: 'A senha é obrigatória',
    })
    .min(8, {
      message: 'A senha precisa ter no mínimo 8 caracteres',
    }),
})

type CreateUserData = z.infer<typeof createUserSchema>

export const ResetPassword = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createUserForm

  const handleOnSubmit = async (data: CreateUserData) => {
    try {
      setLoading(true)

      const { password, password_confirmation } = data
      const token = location.search.replace('?token=', '')

      if (!token) {
        throw new Error()
      }

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token,
      })

      navigate('/')
      toast.success('Redefinição de senha enviada com sucesso.')
    } catch {
      toast.error('Ocorreu um erro ao resetar a senha, tente novamente!')

      setLoading(false)
    }
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />

          <FormProvider {...createUserForm}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <h1>Resetar senha </h1>

              <Input
                name="password"
                type="password"
                placeholder="Senha"
                icon={FiLock}
                errorMessage={errors?.password?.message ?? ''}
              />

              <Input
                name="password_confirmation"
                type="password"
                placeholder="Confirme sua senha"
                icon={FiLock}
                errorMessage={errors?.password?.message ?? ''}
              />
              <Button type="submit">
                {loading ? <Loading /> : 'Alterar senha'}
              </Button>
            </form>
          </FormProvider>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}
