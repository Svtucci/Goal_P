import { put, takeEvery, takeLatest, select } from 'redux-saga/effects'; 
import axios from 'axios';


function* waterIntake(action) {
    try {
      const { currentIntake, userId } = action.payload;
      yield axios.post('/api/track', { userId, amount: currentIntake });
      yield put({ type: 'SET_DAILY_INTAKE', payload: currentIntake });
    } catch (error) {
      console.log('Water intake to DB failed', error);
    }
  }

  function* submissionData() {
    try {
      const response = yield axios.get('/api/track'); 
      const submission = response.data; 
      yield put({ type: 'SET_SUBMISSION_DATA', payload: submission }); 
    } catch (error) {
      console.log('Error in retrieving submission data', error);
    }
  }
  

  

function* waterSubmission() {
    yield takeEvery('DAILYSUBMISSION', waterIntake);
    yield takeEvery('FETCH_SUBMISSION', submissionData);
  }

  export default waterSubmission; 

