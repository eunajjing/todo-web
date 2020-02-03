import React from 'react'
import { useForm } from 'react-hook-form'
import { Container } from '../src/design-system'

interface SignInType {
  email: string
  password: string
}

function SignInPage() {
  const { register, handleSubmit } = useForm<SignInType>()

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log(email, password)
  })

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <label>email</label>
        <input type="email" name="email" ref={register} required={true} />
        <label>password</label>
        <input type="password" name="password" ref={register} required={true} />
        <input type="submit" />
      </form>
    </Container>
  )
}

export default SignInPage
