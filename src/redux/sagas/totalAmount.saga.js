import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTotalAmount() {
  try {
    const response = yield axios.get('/api/history');
    const totalAmount = response.data.reduce(
      (total, entry) => total + entry.amount,
      0
    );
    yield put({ type: 'SET_TOTAL_AMOUNT', payload: totalAmount });
  } catch (error) {
    console.log('Error fetching total amount', error);
  }
}

function* watchTotalAmount() {
  yield takeEvery('FETCH_TOTAL_AMOUNT', fetchTotalAmount);
}

export default watchTotalAmount;

