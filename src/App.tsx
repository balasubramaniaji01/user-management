import React, { useEffect } from 'react';
import { RootState, useAppSelector } from './components/store';
import './styles/global.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserList from './pages/UserList';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  const theme = useAppSelector((state: RootState) => state.theme.mode);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
