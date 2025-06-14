import { ProForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-components';
import { Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import './styles/login.scss';
import { RootState } from '../components/store';
import { userService } from '../services/userService';
// import Swal from 'sweetalert2';
import { setAuthenticated } from '../components/store/authSlice';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: { email: string; password: string }) => {
    await userService.login({ email: values.email, password: values.password });
    dispatch(setAuthenticated(true));

    // Swal.fire({
    //   title: 'Login Successful!',
    //   text: `Welcome, ${values.email}`,
    //   icon: 'success',
    //   confirmButtonText: 'OK',
    // }).then(() => {
    //   navigate('/users', { replace: true });
    // });
  };

  return (
    <div className={`login-container ${theme}`}>
      <Card className="login-card" title="Login">
        <ProForm
          onFinish={handleSubmit}
          initialValues={{ rememberMe: true }}
          submitter={{
            searchConfig: { submitText: 'Login' },
            resetButtonProps: false,
            render: (_, dom) => <div style={{ textAlign: 'center' }}>{dom}</div>,
          }}
        >
          <ProFormText
            name="email"
            placeholder="Email"
            fieldProps={{
              prefix: <UserOutlined />,
            }}
            rules={[{ required: true }, { type: 'email' }]}
          />
          <ProFormText.Password
            name="password"
            placeholder="Password"
            fieldProps={{
              prefix: <LockOutlined />,
            }}
            rules={[{ required: true }, { min: 6 }]}
          />
          <ProFormCheckbox name="rememberMe">Remember me</ProFormCheckbox>
        </ProForm>
      </Card>
    </div>
  );
};

export default Login;
