import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';

export default function LeftBar() {
  const {
    state: { user },
    logoutUser,
  } = useContext(AuthContext);

  const userLinks = () => (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/" onClick={logoutUser}>
        Logout
      </Link>
    </nav>
  );

  const visitorLinks = () => (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </nav>
  );

  return user.id ? userLinks() : visitorLinks();
}
