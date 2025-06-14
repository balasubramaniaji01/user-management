import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('auth') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isAuthenticated = true;
      localStorage.setItem('auth', 'true');
    },
    logout: state => {
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
      localStorage.setItem('auth', 'true');
    },
  },
});

export const { login, logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
