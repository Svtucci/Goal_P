import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined';
import { IconButton, Button, colors } from '@mui/material';
import { styled } from '@mui/system';
import './trackStyles.css';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { Water } from '@mui/icons-material';
import dailySubmission from '../../redux/reducers/intake.reducer';

function Track() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const goal = useSelector((store) => store.setGoal);

  const data = useSelector((store) => store.submissionData);

  const [currentIntake, setCurrentIntake] = useState(0);
  const [totalIntake, setTotalIntake] = useState(0);
  const [progress, setProgress] = useState(0);


  const CustomIconButton = styled(IconButton)`
    color: white;
    background-color: darkblue;
    border: 1px solid white;

    &:hover {
      background-color: white;
      color: grey;
    }
  `;

// const fetchData = () => {
//   dispatch({ type: 'FETCH_SUBMISSION' })
// };


console.log(data); 


  useEffect(() => {
    calculateProgress();
  }, [totalIntake, goal]);

  useEffect(() => {
    setCurrentIntake(0);
    calculateProgress();
  }, [goal]);

  const formSubmit = (e) => {
    e.preventDefault();
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
        <h1 className='title'>Daily Goal: {user.daily_goal} oz</h1>
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
            <IconButton //6
              type="button"
              onClick={() => autoFillIntake(6)}
              style={{ fontSize: '16px',
                        color: 'white' }}
            >
              <WaterDropIcon fontSize="small" />
              6oz
            </IconButton>

            <IconButton //12
              type="button"
              onClick={() => autoFillIntake(12)}
              style={{ fontSize: '16px',
              color: 'white' }}
            >
              <WaterDropIcon fontSize="small" />
              12oz
            </IconButton>

            <IconButton // 24
              type="button"
              onClick={() => autoFillIntake(24)}
              style={{ fontSize: '16px',
              color: 'white' }}
            >
              <WaterDropIcon fontSize="small" />
              24oz
            </IconButton>

            <IconButton // 36
              type="button"
              onClick={() => autoFillIntake(36)}
              style={{ fontSize: '16px',
              color: 'white' }}
            >
              <WaterDropIcon fontSize="small" />
              36oz
            </IconButton>

            <IconButton //48
              type="button"
              onClick={() => autoFillIntake(48)}
              style={{ fontSize: '16px',
              color: 'white' }}
            >
              <WaterDropIcon fontSize="small" />
              48oz
            </IconButton>

          </div>
          <div className="submit-button">
        <CustomIconButton type="submit">
          <LocalDrinkOutlinedIcon />
        </CustomIconButton>
      </div>
        </form>
      </div>

      <div>
        <h3 className='progress'>Progress: {progress}%</h3>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{
              width: `${progress <= 100  ? progress : 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Track;










