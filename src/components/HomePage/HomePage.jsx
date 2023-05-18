import React from 'react';
import {useSelector} from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function HomePage() {
  const user = useSelector((store) => store.user);


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h3>Your goal is: {user.daily_goal}</h3>

      <LogOutButton className="btn" />
    </div>
  );
}

export default HomePage;
