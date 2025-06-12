import { useDispatch } from 'react-redux';
import { logout } from '../components/store/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../api/commonComponents/Header';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="card">
      <Header />
      <h2>User List</h2>
      <ul>
        <li>👤 Bala</li>
        <li>👤 John</li>
      </ul>
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserList;
