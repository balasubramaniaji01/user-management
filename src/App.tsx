import React, { useEffect } from 'react';
import { RootState, useAppSelector } from './components/store';
import './styles/global.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserList from './pages/UserList';

const App: React.FC = () => {
  const theme = useAppSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
