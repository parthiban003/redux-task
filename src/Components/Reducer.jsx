const initialState = {
  input1: '',
  input2: ''
};

export default function inputReducer(state = initialState, action) {
  switch (action.type) {
    case 'SUBMIT_INPUTS':
      return {
        ...state,
        input1: action.payload.input1,
        input2: action.payload.input2
      };
    default:
      return state;
  }
}