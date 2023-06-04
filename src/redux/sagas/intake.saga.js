import { put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';

function* waterIntake(action) {
  try {
    const { currentIntake, userId } = action.payload;
    yield axios.post('/api/track', { userId, amount: currentIntake });
    yield put({ type: 'SET_DAILY_INTAKE', payload: currentIntake });

    const goal = yield select((state) => state.setGoal); // Retrieve the goal from the state
    const totalIntake = yield select((state) => state.totalIntake); // Retrieve the total intake from the state

    const progress = (totalIntake + currentIntake) / goal * 100; // Calculate the progress
    yield put({ type: 'SET_PROGRESS', payload: progress }); // Dispatch the progress to update in the reducer
  } catch (error) {
    console.log('Water intake to DB failed', error);
  }
}

function* waterSubmission() {
  yield takeEvery('DAILYSUBMISSION', waterIntake);
}

export default waterSubmission;


