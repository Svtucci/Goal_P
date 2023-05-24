import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [editingGoal, setEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(user.daily_goal);

  const formSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: 'UPDATE_NEW_GOAL',
      payload: {
        newGoal,
        userId: user.id,
      },
    });

    setEditingGoal(false);
  };

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      {editingGoal ? (
        <form onSubmit={formSubmit}>
          <label>
            New Goal:
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <h3>Your goal is: {user.daily_goal}</h3>
          <button onClick={() => setEditingGoal(true)}>Edit</button>
        </div>
      )}

      <LogOutButton className="btn" />
    </div>
  );
}

export default HomePage;


// Update works only when manual refresh so far
