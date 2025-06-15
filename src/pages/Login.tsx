import { ProForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-components';
import { notification, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import './styles/login.scss';
import { RootState } from '../components/store';
import { userService } from '../services/userService';
import { setAuthenticated } from '../components/store/authSlice';

const Login = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await userService.login({ email: values.email, password: values.password });

      if (res) {
        dispatch(setAuthenticated(true));
      }
    } catch {
      api.error({
        message: 'Login Failed',
        description: 'Invalid email or password.',
      });
    }
  };

  return (
    <div className={`loginContainer ${theme}`}>
      {contextHolder}
      <Card title="Login">
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
