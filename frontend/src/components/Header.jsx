import { Avatar, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const HeaderComponent = ({ title, colorBgContainer }) => {
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const logout = useStore(state => state.logout);

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
    <header
      style={{
        padding: '0 24px',
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        height: 64
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 500 }}>
        {title}
      </div>
      <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Avatar style={{ backgroundColor: '#1890ff', marginRight: 8 }}>
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <span>{user?.name || '用户'}</span>
        </div>
      </Dropdown>
    </header>
  );
};

export default HeaderComponent;