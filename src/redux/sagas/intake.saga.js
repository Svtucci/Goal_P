import { put, takeEvery } from 'redux-saga/effects'; 
import axios from 'axios';


function* waterIntake(action) {
    try {
        yield axios.post('/api/entry', action.payload);
        yield put({ type: ''})
    }
}