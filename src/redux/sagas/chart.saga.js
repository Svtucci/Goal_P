import { call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchChartHistory() {
  try {
    const response = yield call(fetchChartData);
    const history = response.data;
    yield put({ type: 'FETCH_CHART_DATA_SUCCESS', payload: history }); // Dispatch a success action if needed
  } catch (error) {
    console.log('Intake Chart Failed', error);
    yield put({ type: 'FETCH_CHART_DATA_FAILURE', error }); // Dispatch a failure action if needed
  }
}

function fetchChartData() {
  return axios.get('/api/track');
}

function* chartSaga() {
  yield takeLatest('FETCH_CHART_DATA', fetchChartHistory);
}

export default chartSaga;

