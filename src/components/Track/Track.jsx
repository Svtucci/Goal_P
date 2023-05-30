import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { IconButton, Button } from '@mui/material';
import { styled } from '@mui/system';
import './trackStyles.css';

function Track() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const goal = useSelector((store) => store.setGoal);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [totalIntake, setTotalIntake] = useState(0);
  const [progress, setProgress] = useState(0);

  const CustomAddIcon = styled(AddCircleOutlineOutlinedIcon)`
    color: blue;
    font-size: 24px;
  `;

  const CustomButton = styled(Button)`
    color: white;
    background-color: grey;
    border: 1px solid white;

    &:hover {
      background-color: white;
      color: grey;
    }
  `;

  useEffect(() => {
    calculateProgress();
  }, [totalIntake, goal]);

  useEffect(() => {
    setCurrentIntake(0);
    calculateProgress();
  }, [goal]);

  const formSubmit = (e) => {
    e.preventDefault();

    const data = {
      amount: currentIntake,
      userId: user.id,
    };

    dispatch({
      type: 'DAILYSUBMISSION',
      payload: {
        currentIntake: currentIntake,
        userId: user.id,
      },
    });
    setTotalIntake(totalIntake + currentIntake);
    setCurrentIntake(0);
  };

  const addIntake = () => {
    setCurrentIntake(currentIntake + 1);
  };

  const minusIntake = () => {
    setCurrentIntake(currentIntake - 1);
  };

  const autoFillIntake = (value) => {
    setCurrentIntake(value);
  };

  const calculateProgress = () => {
    const newProgress = (totalIntake / user.daily_goal) * 100;
    setProgress(newProgress.toFixed(1));
  };

  return (
    <div className="track-container">
      <div>
        <h1>Daily Goal: {user.daily_goal} oz</h1>
      </div>

      <div>
        <form onSubmit={formSubmit}>
          <div className="intake-form">
            <IconButton type="button" onClick={minusIntake}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
            <input
              type="text"
              id="intake"
              value={currentIntake}
              onChange={(e) => setCurrentIntake(Number(e.target.value))}
            />
            <IconButton type="button" onClick={addIntake}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </div>
          <div className="auto-fill-buttons">
            <button type="button" onClick={() => autoFillIntake(6)}>
              Fill 6
            </button>
            <button type="button" onClick={() => autoFillIntake(12)}>
              Fill 12
            </button>
          </div>
          <div className="submit-button">
            <CustomButton type="submit" variant="outlined">
              Submit
            </CustomButton>
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







