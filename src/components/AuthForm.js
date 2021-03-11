import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{login ? 'Log In' : 'Sign Up'}</h1>
        <input type="text" name="email" value={email} onChange={setEmail} />
        <input
          type="password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        <input
          type="submit"
          placeholder={login ? 'Log In' : 'Create Acoount'}
        />
      </form>
      <Link>{login ? 'Register' : 'Already a member?  Log In'}</Link>
    </>
  );
}
