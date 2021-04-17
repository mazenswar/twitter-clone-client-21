import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';

export default function AuthForm({ setAuth }) {
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { errorMessage, createOrLoginUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrLoginUser({ username, password, login });
    setAuth();
    history.push('/');
  };
  return (
    <>
      {errorMessage ? <h1>{errorMessage}</h1> : null}
      <form onSubmit={handleSubmit}>
        <h1>{login ? 'Log In' : 'Sign Up'}</h1>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
