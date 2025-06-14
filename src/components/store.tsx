import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import themeReducer from '../features/theme/themeSlice';
import authReducer from './store/authSlice';
import userListReducer from './store/userListSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
