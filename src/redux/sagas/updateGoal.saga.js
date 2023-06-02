// updateGoal.saga.js

import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateGoalSaga(action) {
  try {
    const { newGoal, userId } = action.payload;
    yield axios.put('/api/track', { userId, goal: newGoal });
    yield put({ type: 'SET_NEW_GOAL', payload: newGoal });
    // yield fetchGoal(); 
  } catch (error) {
    console.log('Goal update failed', error);
  }
}

function* fetchGoal() {
    try{
        const goal = yield axios.get('api/goal');
        yield put ({ type: 'SET_GOAL', payload: goal});
    } catch (error) {
        console.log( 'Error in setting Goal: ${error}' );
        alert('Something went wrong')
    }
}

function* updateGoal() {
  yield takeEvery('UPDATE_NEW_GOAL', updateGoalSaga);
  yield takeLatest('FETCH_GOAL', fetchGoal)
}

export default updateGoal;
