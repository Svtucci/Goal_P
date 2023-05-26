import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

import LoadingBar from '../LoadingBar/LoadingBar';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const goal = useSelector((store) => store.setGoal);
  const [editingGoal, setEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(user.daily_goal);

  console.log(user.length); 
  useEffect(() => {
    console.log('user.daily_goal:', user.daily_goal);
    setNewGoal(user.daily_goal);
  }, [user.daily_goal]);

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

console.log(user.length);


const userArray = Object.keys(user);
console.log(userArray)
  return (
    <center>
      {userArray.length === 0 ? (
        <LoadingBar />
      ) : (
        <div className="container">
          <h2>Welcome, {user.username}!</h2>
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
              <h3>Your goal is: {newGoal}ml</h3>
              <button onClick={() => setEditingGoal(true)}>Edit</button>
              <p />
            </div>
          )}
        </div>
      )}
      <LogOutButton className="btn" />
    </center>
  );
};

export default HomePage;





// Update works only when manual refresh so far
