import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';

export default function AuthForm() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errorMessage, createOrLoginUser } = useContext(AuthContext);
  return (
    <>
      {errorMessage ? <h1>{errorMessage}</h1> : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createOrLoginUser({ email, password, login });
        }}
      >
        <h1>{login ? 'Log In' : 'Sign Up'}</h1>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          placeholder={login ? 'Log In' : 'Create Acoount'}
        />
      </form>
      <Link to="" onClick={() => setLogin(!login)}>
        {login ? 'Register' : 'Already a member?  Log In'}
      </Link>
    </>
  );
}
