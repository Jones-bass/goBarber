import React, { InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, ErrosText } from './styles'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  errorMessage: string
  icon: React.ComponentType<IconBaseProps>
}

const Input = ({ errorMessage, name, icon: Icon, ...rest }: InputProps) => {
  const { register } = useFormContext()

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...register(name)} {...rest} />
      {errorMessage && (
        <ErrosText title={errorMessage}>
          <FiAlertCircle size={20} color="#c53030" />
        </ErrosText>
      )}
    </Container>
  )
}

export default Input
