import { put, takeEvery, takeLatest } from 'redux-saga/effects'; 
import axios from 'axios';


function* waterIntake(action) {
    try {
        yield axios.post('/api/entry', action.payload);
        yield put({ type: 'SET_DAILY_INTAKE', payload: action.payload.currentIntake })
    } catch (error) {

    }
}

function* waterSubmission() {
    yield takeEvery('DAILYSUBMISSION', waterIntake);
  }

  export default waterSubmission; 