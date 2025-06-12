import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: sessionStorage.getItem('auth') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuthenticated = true;
      sessionStorage.setItem('auth', 'true');
    },
    logout: state => {
      state.isAuthenticated = false;
      sessionStorage.removeItem('auth');
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      sessionStorage.setItem('auth', 'true');
    },
  },
});

export const { login, logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
