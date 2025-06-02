import { takeEvery } from 'redux-saga/effects';
import { SUBMIT_INPUTS } from './actions';

function* handleInputs(action) {
  const { input1, input2 } = action.payload;
  console.log('Input 1:', input1);
  console.log('Input 2:', input2);
}

export default function* rootSaga() {
  yield takeEvery(SUBMIT_INPUTS, handleInputs);
}