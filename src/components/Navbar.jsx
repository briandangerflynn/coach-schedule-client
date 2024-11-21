import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const LoginButton = () => {
    if(user){
      return (
        <>
          <Link to="/"><button>Appointments</button></Link>
          <button onClick={logout}>Logout</button>
        </>
      )
    } else {
      return <Link to="/login"><button>Login</button></Link>;
    };
  };

  return (
    <nav>
      <LoginButton />
    </nav>
  );
};
