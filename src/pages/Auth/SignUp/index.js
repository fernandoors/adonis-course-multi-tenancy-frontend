import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { Container, SignForm } from '../styles';
import Button from '~/styles/components/Button';
import AuthActions from '~/store/ducks/auth'

function Signup() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleEmail(event) {
    setEmail(event.target.value)
  }
  function handleName(event) {
    setName(event.target.value)
  }
  function handlePassword(event) {
    setPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(AuthActions.signUpRequest(name, email, password))
  }
  return (
    <Container>
      <SignForm onSubmit={handleSubmit}>
        <h1>Register</h1>

        <span>Name</span>
        <input onChange={handleName} value={name} name='name' />

        <span>E-Mail</span>
        <input onChange={handleEmail} value={email} type='email' name='email' />

        <span>Password</span>
        <input onChange={handlePassword} value={password} type='password' name='password' />

        <Button size='big' type='submit' onClick={handleSubmit}>Sign Up</Button>
      </SignForm>
    </Container>
  );
}

export default Signup;