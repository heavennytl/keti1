import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, theme } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  DashboardOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useStore } from '../store';

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useStore(state => state.user);
  const logout = useStore(state => state.logout);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '首页看板'
    },
    {
      key: '/models',
      icon: <AppstoreOutlined />,
      label: '模型管理'
    },
    {
      key: '/metrics',
      icon: <ExperimentOutlined />,
      label: '评测指标'
    },
    {
      key: '/scenes',
      icon: <DatabaseOutlined />,
      label: '场景孪生'
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: '报告中心'
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置'
    }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息'
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#fff',
          fontSize: collapsed ? 16 : 18,
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {collapsed ? '垂域' : '垂域模型评估系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer, 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: 16, fontWeight: 500 }}>
            课题1：面向动态场景适配的垂域模型多元评估与虚拟验证系统
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar style={{ backgroundColor: '#1890ff', marginRight: 8 }}>
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              <span>{user?.name || '用户'}</span>
            </div>
          </Dropdown>
        </Header>
        
        <Content style={{ margin: 16, padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, minHeight: 'calc(100vh - 112px)', overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
