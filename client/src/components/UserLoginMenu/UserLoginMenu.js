import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip, Spin } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import './UserLoginMenu.scss';


export default function UserLoginMenu() {
  const { user, logout, isAuthenticated, loginWithRedirect, isLoading } =
    useAuth0();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  const items = isAuthenticated
    ? [
        {
          label: 'Dashboard',
          key: '1',
          icon: <UserOutlined />,
          onClick: handleDashboardClick,
        },
        {
          label: 'My Profile',
          key: '2',
          icon: <UserOutlined />,
          onClick: handleDashboardClick,
        },
        {
          label: 'Logout',
          key: '3',
          icon: <UserOutlined />,
          danger: true,
          onClick: handleLogout,
        },
      ]
    : [
        {
          label: 'Signup / Login',
          key: '1',
          icon: <UserOutlined />,
          onClick: loginWithRedirect,
        },
      ];

  const menuProps = {
    items,
  };

  if (isLoading) {
    return (
      <Space wrap>
        <Button icon={<UserOutlined />}>
          <Space>
            <DownOutlined />
          </Space>
        </Button>
      </Space>
    );
  }

  return (
    <Space wrap>
      {isAuthenticated ? (
        <Dropdown menu={menuProps}>
          <Button icon={<UserOutlined />}>
            <Space>
              {isAuthenticated
                ? `Welcome Back ${user.name}!`
                : 'Drop-In Providers Signup / Login'}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ) : (
        <Button icon={<UserOutlined />} onClick={loginWithRedirect}>
          <Space>
            {isAuthenticated
              ? `Welcome Back ${user.name}!`
              : 'Drop-In Providers Signup / Login'}
          </Space>
        </Button>
      )}
    </Space>
  );
}
