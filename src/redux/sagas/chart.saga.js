import { call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchChartHistory() {
  try {
    const response = yield call(fetchChartData);
    const history = response.data;
    yield put({ type: 'FETCH_CHART_DATA_SUCCESS', payload: history });
  } catch (error) {
    console.log('Intake Chart Failed', error);
    yield put({ type: 'FETCH_CHART_DATA_FAILURE', error }); 
  }
}

function fetchChartData() {
  return axios.get('/api/track');
}

function* chartSaga() {
  yield takeLatest('FETCH_CHART_DATA', fetchChartHistory);
}

export default chartSaga;



