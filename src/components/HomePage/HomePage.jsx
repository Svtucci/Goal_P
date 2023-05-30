import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import LoadingBar from '../LoadingBar/LoadingBar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  // const goal = useSelector((store) => store.setGoal);
  const [editingGoal, setEditingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(user.daily_goal);

  useEffect(() => {
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

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'white',
            border: '1px solid white',
            '&:hover': {
              border: '1px solid white',
            },
          },
          outlinedSizeMedium: {
            padding: '8px 16px',
            fontSize: '14px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <center>
        {Object.keys(user).length === 0 ? (
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
                <Button variant="outlined" size="medium" type="submit">
                  Save
                </Button>
              </form>
            ) : (
              <div>
                <h3>Your goal is: {newGoal}ml</h3>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => setEditingGoal(true)}
                >
                  Update Daily Goal
                </Button>
                <p />
              </div>
            )}
          </div>
        )}
        <LogOutButton className="btn" />
      </center>
    </ThemeProvider>
  );
}

export default HomePage;







// Update works only when manual refresh so far
