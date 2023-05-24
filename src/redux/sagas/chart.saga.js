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


// NEW CODE 

// import { put, call, takeEvery } from 'redux-saga/effects';
// import axios from 'axios';
// import { fetchHistorySuccess, fetchHistoryFailure } from './historyActions';

// function* fetchHistoryDataSaga() {
//   try {
//     const response = yield call(axios.get, '/api/track');
//     yield put(fetchHistorySuccess(response.data));
//   } catch (error) {
//     yield put(fetchHistoryFailure(error));
//   }
// }

// function* chartSaga() {
//   yield takeEvery('FETCH_HISTORY_REQUEST', fetchHistoryDataSaga);
// }

// export default chartSaga;

