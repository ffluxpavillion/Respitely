import './Dashboard.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import AddMealForm from '../../forms/AddMealForm';
import AddMeal from '../../forms/AddMeal';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

export default function Dashboard() {
  // const { user } = useContext(UserContext); // doesnt work -- need to remove
  const [selectedKey, setSelectedKey] = useState('1');
  const [openKeys, setOpenKeys] = useState(['2']);
  const { user, isAuthenticated } = useAuth0();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return (
          <div>
            <h2>Profile</h2>
            <p>Profile content goes here.</p>
          </div>
        );
      case '2-1':
        return (
          <div>
            <h2>Meals</h2>
            <p>Drop In Meals content goes here.</p>
          </div>
        );
      case '2-2':
        return (
          <div>
            <h2>Showers</h2>
            <p>Showers content goes here.</p>
          </div>
        );
      case '2-3':
        return (
          <div>
            <h2>Add Service</h2>
            <AddMealForm />
            {/* <AddMeal /> */}
          </div>
        );
      case '3-1':
        return (
          <div>
            <h2>Current Hours</h2>
            <p>Current Hours content goes here.</p>
          </div>
        );
      case '3-2':
        return (
          <div>
            <h2>Temporary Hours</h2>
            <p>Temporary Hours content goes here.</p>
          </div>
        );
      case '4':
        return (
          <div>
            <h2>Settings</h2>
            <p>Settings content goes here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className='dashbord-section'>
      <div className='dashboard__div'>
        <div className='dashboard__sider-container'>
          <Sider
            className='sider'
            width={250}
            z-index={-100}
            theme='dark'
            breakpoint='lg'
            collapsedWidth='0'
          >
            <div className='logo' />
            <Menu
              theme='dark'
              mode='inline'
              defaultSelectedKeys={['1']}
              selectedKeys={[selectedKey]}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              onClick={handleMenuClick}
            >
              <Menu.Item key='1' icon={<UserOutlined />}>
                Overview
              </Menu.Item>
              <SubMenu
                key='2'
                icon={<DatabaseOutlined />}
                title='Drop-In Services'
              >
                <Menu.Item key='2-1'>Meals</Menu.Item>
                <Menu.Item key='2-2'>Showers</Menu.Item>
                <Menu.Item key='2-3'>Add Service</Menu.Item>
              </SubMenu>
              <SubMenu key='3' icon={<ClockCircleOutlined />} title='Hours'>
                <Menu.Item key='3-1'>Current Hours</Menu.Item>
                <Menu.Item key='3-2'>Temporary Hours</Menu.Item>
              </SubMenu>
              <Menu.Item key='4' icon={<SettingOutlined />}>
                Settings
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
        <div className='dashboard__main-container'>
          <Layout style={{ minHeight: '100vh' }}>
            <Layout>
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24 }}>
                  <h1 className='dashboard-header'>Dashboard</h1>
                  {!!user ? (
                    <h2 className='dashboard-header'>Hi {user.name}!</h2>
                  ) : (
                    <h2 className='dashboard-header'>Loading...</h2>
                  )}
                  {renderContent()}
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
      </div>
    </section>
  );
}
