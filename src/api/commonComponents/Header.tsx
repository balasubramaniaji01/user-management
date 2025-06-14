import React from 'react';
import './styles/header.scss';
import { LogoutOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../components/store';
// import { toggleTheme } from '../../features/theme/themeSlice';
import { logout } from '../../components/store/authSlice';
import { useNavigate } from 'react-router-dom';
// import { Switch } from 'antd';

const Header: React.FC = () => {
  // const theme = useAppSelector(state => state.theme.mode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // const handleThemeChange = () => {
  //   dispatch(toggleTheme());
  // };

  return (
    <div className="headerWrapper">
      <div>
        {/* <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={theme === 'light'}
          onChange={handleThemeChange}
        /> */}
        <div>Elon Musk</div>
        <LogoutOutlined onClick={handleLogout} />
      </div>
    </div>
  );
};
export default Header;
