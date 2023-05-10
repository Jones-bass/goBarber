import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'
import { Loading } from '../Loading'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const Button = ({ children, loading, ...rest }: ButtonProps) => (
  <Container type="button" {...rest}>
    {loading && <Loading />}
    {children}
  </Container>
)
