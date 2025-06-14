import React, { useCallback, useState } from 'react';
import { Button, Card, Tooltip } from 'antd';
import DataFlexView from '../api/commonComponents/DataFlexView';
import { setLoading, setUserList } from '../components/store/userListSlice';
import { userService } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../components/store';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles/userList.scss';
import Header from '../api/commonComponents/Header';
import UserCreateAndUpdateModal from './UserCreateAndUpdateModal';

const UserList = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<any | null>(null);
  const usersData = useSelector((state: RootState) => state.user);
  const tableData = usersData?.userList || [];

  const isLoading = usersData?.isLoading || false;

  const fetchUserList = useCallback(
    async (currentPage: number) => {
      dispatch(setLoading(true));
      const data = await userService.getUserById(currentPage);
      if (data?.status === 200) {
        dispatch(setUserList(data?.data || []));
      }
      dispatch(setLoading(false));
    },
    [dispatch]
  );

  const handleEdit = (record: any) => {
    setIsModalOpen(record);
  };

  const handleDelete = (record: any) => {
    console.log('Delete:', record);
  };

  const createUser = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (url: string) => (
        <img src={url} alt="avatar" style={{ width: 40, borderRadius: '50%' }} />
      ),
      align: 'center' as const,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Actons',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record)} color="danger" variant="solid">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const renderCard = (
    item: any,
    onEdit?: (record: any) => void,
    onDelete?: (record: any) => void
  ) => (
    <Card key={item.id} className="customCard">
      <div className="cardContent">
        <div className="cardAvatar">
          <img src={item.avatar} alt="avatar" />
        </div>
        <p>
          <strong>
            {item.first_name} {item.last_name}
          </strong>
        </p>
        <p>{item.email}</p>
      </div>
      <div className="cardActions">
        <Tooltip title="Edit">
          <Button
            onClick={() => handleEdit?.(item)}
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            onClick={() => onDelete?.(item)}
            color="danger"
            variant="solid"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      </div>
    </Card>
  );

  return (
    <div>
      <Header />
      <DataFlexView
        tableData={tableData?.data || []}
        handleDataRefresh={fetchUserList}
        searchable
        flowHeader="User List"
        isLoading={isLoading}
        totalCount={tableData?.total || 0}
        tableColumns={columns}
        renderCard={renderCard}
        allowedViews={['table', 'card']}
        actionButtonLabel="Create User"
        onActionButtonClick={createUser}
      />
      {isModalOpen && (
        <UserCreateAndUpdateModal
          totalCount={tableData?.total || 0}
          tableData={tableData?.data || []}
          isModalOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default UserList;
