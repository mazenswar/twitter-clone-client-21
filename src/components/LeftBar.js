import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';

export default function LeftBar({ logoutUser }) {
  const {
    state: { user },
  } = useContext(AuthContext);

  const userLinks = () => (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <h3 onClick={logoutUser}>Logout</h3>
    </nav>
  );

  const visitorLinks = () => (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
    </nav>
  );

  return user ? userLinks() : visitorLinks();
}
