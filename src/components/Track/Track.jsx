import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { IconButton, Button } from '@mui/material';
import './trackStyles.css'; 

function Track() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [totalIntake, setTotalIntake] = useState(0); // New state variable
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    calculateProgress(); // Calculate progress when the component mounts
  }, [totalIntake]);

  const formSubmit = (e) => {
    e.preventDefault();

    const data = {
      amount: currentIntake,
      userId: user.id,
      // data_date: date 
    };

    console.log('Amount and UserId:', data);

    dispatch({
      type: 'DAILYSUBMISSION',
      payload: {
        currentIntake: currentIntake,
        userId: user.id,
      },
    });
    setTotalIntake(totalIntake + currentIntake); // Update totalIntake
    setCurrentIntake(0);
  };

  const addIntake = () => {
    setCurrentIntake(currentIntake + 1);
  };

  const minusIntake = () => {
    setCurrentIntake(currentIntake - 1);
  };

  const calculateProgress = () => {
    const newProgress = (totalIntake / user.daily_goal) * 100; // Calculate progress based on totalIntake
    setProgress(newProgress.toFixed(1));
  };

  return (
    <div className="track-container">
      <div>
        <h1>Daily Goal: {user.daily_goal}ml</h1>
      </div>

      <div>
        <form onSubmit={formSubmit}>
          <div>
            <label htmlFor="intake">Current Intake</label>
            <input
              type="number"
              id="intake"
              value={currentIntake}
              onChange={(e) => setCurrentIntake(Number(e.target.value))}
            />
          </div>
          <div className="intake-form">
            <IconButton type="button" onClick={addIntake}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
            <IconButton type="button" onClick={minusIntake}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
          </div>
          <div className="submit-button">
            <Button type="submit" variant="outlined">Submit</Button>
          </div>
        </form>
      </div>

      <div>
        <h3>Progress: {progress}%</h3>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Track;





