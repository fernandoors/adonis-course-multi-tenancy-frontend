import React, { useState } from 'react';

import { Container, SignForm } from '../styles';
import Button from '~/styles/components/Button';

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmail(event) {
    setEmail(event.target.value)
  }
  function handlePassword(event) {
    setPassword(event.target.value)
  }
  return (
    <Container>
      <SignForm onSubmit={() => { }}>
        <h1>Welcome</h1>

        <span>E-Mail</span>
        <input onChange={handleEmail} value={email} type='email' name='email' required />

        <span>Password</span>
        <input onChange={handlePassword} value={password} type='password' name='password' required />

        <Button size='big' type='submit' >Sign In</Button>
      </SignForm>
    </Container>
  );
}

export default SignIn;