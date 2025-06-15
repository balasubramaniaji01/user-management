import React, { useEffect } from 'react';
import { Modal, Button, Space } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { userService } from '../services/userService';
import { useDispatch } from 'react-redux';
import { setSingleUser, setUserList } from '../components/store/userListSlice';

interface FormValues {
  data: any;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  id: string;
}

interface UserCreateAndUpdateModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  tableData: any[];
  totalCount: number;
  tableMetadata: any;
}

const UserCreateAndUpdateModal: React.FC<UserCreateAndUpdateModalProps> = ({
  isModalOpen,
  onClose,
  tableData,
  tableMetadata,
  totalCount,
}) => {
  const dispatch = useDispatch();

  const { email, first_name, last_name, avatar, id } =
    typeof isModalOpen === 'object' && isModalOpen !== null
      ? isModalOpen
      : { email: '', first_name: '', last_name: '', avatar: '', id: undefined };
  const isEdit = id;

  const onSubmit = async (values: FormValues) => {
    if (isEdit) {
      await userService.updateUser(isEdit || '', {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        avatar: values.avatar,
      });
      const updatedData = tableData.map(user =>
        user.id === isEdit ? { ...user, ...values } : user
      );

      dispatch(
        setUserList({
          ...tableMetadata,
          data: updatedData,
        })
      );
    } else {
      await userService.createUser({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        avatar: values.avatar,
      });

      const updatedData = [...tableData, { ...values, id: Number(tableData.length + 1) }];
      dispatch(
        setUserList({
          ...tableData,
          data: updatedData,
          total: totalCount + 1,
        })
      );
    }
  };

  useEffect(() => {
    userService.getSingleUser(id || '').then(res => {
      const user = res.data as FormValues;
      if (user) {
        dispatch(
          setSingleUser({
            first_name: user.data.first_name,
            last_name: user.data.last_name,
            email: user.data.email,
            avatar: user.data.avatar,
            id: user.data.id,
          })
        );
      }
    });
  }, []);

  return (
    <Modal
      title={isEdit ? 'Edit User' : 'Create User'}
      open={isModalOpen}
      footer={null}
      onCancel={onClose}
    >
      <ProForm<FormValues>
        onFinish={async values => {
          const avatar = values.avatar;
          onSubmit({ ...values, avatar });
          onClose?.();
        }}
        initialValues={{ email, first_name, last_name, avatar, id }}
        layout="vertical"
        submitter={{
          render: props => {
            return (
              <Space style={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" onClick={() => props.form?.submit?.()}>
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              </Space>
            );
          },
        }}
      >
        <ProFormText
          name="first_name"
          label="First Name"
          placeholder="Enter first name"
          rules={[{ required: true, message: 'First name is required' }]}
        />
        <ProFormText
          name="last_name"
          label="Last Name"
          placeholder="Enter last name"
          rules={[{ required: true, message: 'Last name is required' }]}
        />
        <ProFormText
          name="email"
          label="Email"
          placeholder="Enter email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Invalid email' },
          ]}
        />
        <ProFormText
          name="avatar"
          label="Avatar URL"
          placeholder="Enter avatar image URL"
          rules={[
            { required: true, message: 'Avatar URL is required' },
            {
              pattern: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$/i,
              message: 'Please enter a valid image URL (e.g., https://example.com/image.jpg)',
            },
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default UserCreateAndUpdateModal;
