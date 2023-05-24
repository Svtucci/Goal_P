import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Track() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [progress, setProgress] = useState(0);

  const formSubmit = (e) => {
    e.preventDefault();

    const data = {
      amount: currentIntake,
      userId: user.id,
    };

    console.log('Amount and UserId:', data);

    dispatch({
      type: 'DAILYSUBMISSION',
      payload: {
        currentIntake: currentIntake,
        userId: user.id,
      },
    });
    setCurrentIntake(0);
    calculateProgress(); // Update progress on submission
  };

  const addIntake = () => {
    setCurrentIntake(currentIntake + 1);
  };

  const minusIntake = () => {
    setCurrentIntake(currentIntake - 1);
  };

  const calculateProgress = () => {
    const newProgress = (currentIntake / user.daily_goal) * 100;
    setProgress(newProgress.toFixed(1));
  };

  return (
    <>
      <div>
        <p>TRACKING</p>
        <h1>Daily goal for the next 30 days: {user.daily_goal}ml</h1>
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
          <div>
            <button type="button" onClick={addIntake}>
              +
            </button>
            <button type="button" onClick={minusIntake}>
              -
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h3>Progress: {progress}%</h3>
        <div
          style={{
            width: '100%',
            backgroundColor: '#ccc',
            height: '20px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: 'green',
              height: '100%',
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Track;

