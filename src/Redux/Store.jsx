import { configureStore, createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    email: '',
  },
  reducers: {
    submitForm: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
      console.log("Submitted Data:", { name, email }); // Show in console
    },
  },
});

export const { submitForm } = formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export default store;