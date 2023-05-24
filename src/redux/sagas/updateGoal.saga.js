// updateGoal.saga.js

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateGoalSaga(action) {
  try {
    const { newGoal, userId } = action.payload;
    yield axios.put('/api/track', { userId, goal: newGoal });
    yield put({ type: 'SET_NEW_GOAL', payload: newGoal });
  } catch (error) {
    console.log('Goal update failed', error);
  }
}

function* updateGoal() {
  yield takeEvery('UPDATE_NEW_GOAL', updateGoalSaga);
}

export default updateGoal;
