import { FiLock } from 'react-icons/fi'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useForm, FormProvider } from 'react-hook-form'

import logo from '../../assets/logo.svg'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Container, Content, AnimationContainer, Background } from './styles'

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
  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = createUserForm

  const handleOnSubmit = async (data: CreateUserData) => {
    console.log(data)
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
              <Button type="submit">Alterar senha</Button>
            </form>
          </FormProvider>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}
