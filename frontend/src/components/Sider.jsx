import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const SiderComponent = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="dark"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1
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
  );
};

export default SiderComponent;