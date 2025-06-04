import { takeEvery, put, call } from 'redux-saga/effects';
import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from './Actions';

// Register Saga
function* registerSaga(action) {
  try {
    const response = yield call(fetch, 'https://682c6773d29df7a95be6e6ee.mockapi.io/RegisterUsers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });

    if (response.ok) {
      yield put({ type: REGISTER_SUCCESS, payload: 'Registered Successfully!' });
    } else {
      yield put({ type: REGISTER_FAILURE, payload: 'Registration failed. Try again.' });
    }
  } catch {
    yield put({ type: REGISTER_FAILURE, payload: 'Server error.' });
  }
}

// Login Saga
function* loginSaga(action) {
  try {
    const res = yield call(fetch, 'https://682c6773d29df7a95be6e6ee.mockapi.io/RegisterUsers');
    const users = yield res.json();

    const matchedUser = users.find(
      (user) => user.email === action.payload.email && user.password === action.payload.password
    );

    if (matchedUser) {
      localStorage.setItem('authToken', JSON.stringify({ email: matchedUser.email }));
      localStorage.setItem('profilePic', `https://i.pravatar.cc/100?u=${matchedUser.email}`);
      yield put({ type: LOGIN_SUCCESS, payload: 'Login Successful!' });
      yield call(() => setTimeout(() => action.navigate('/profile'), 2000));
    } else {
      yield put({ type: LOGIN_FAILURE, payload: 'Invalid email or password.' });
    }
  } catch {
    yield put({ type: LOGIN_FAILURE, payload: 'Login failed. Try again later.' });
  }
}

// Root saga
export default function* rootSaga() {
  yield takeEvery(REGISTER_REQUEST, registerSaga);
  yield takeEvery(LOGIN_REQUEST, loginSaga);
}
