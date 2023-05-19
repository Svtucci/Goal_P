import { put, takeEvery, takeLatest } from 'redux-saga/effects'; 
import axios from 'axios';


function* waterIntake(action) {
    try {
      const { currentIntake } = action.payload;
      yield axios.post('/api/track', { amount: currentIntake });
      yield put({ type: 'SET_DAILY_INTAKE', payload: currentIntake });
    } catch (error) {
      console.log('Water intake to DB failed', error);
    }
  }

function* waterSubmission() {
    yield takeEvery('DAILYSUBMISSION', waterIntake);
  }

  export default waterSubmission; 