import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { Container, SignForm } from '../styles';
import Button from '~/styles/components/Button';
import AuthActions from '~/store/ducks/auth'

function SignIn() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmail(event) {
    setEmail(event.target.value)
  }
  function handlePassword(event) {
    setPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(AuthActions.signInRequest(email, password))
  }
  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Welcome</h1>

        <span>E-Mail</span>
        <input onChange={handleEmail} value={email} type='email' name='email' />

        <span>Password</span>
        <input onChange={handlePassword} value={password} type='password' name='password' />

        <Button size='big' type='submit' onClick={handleSubmit}>Sign In</Button>
      </SignForm>
    </Container>
  );
}

export default SignIn;