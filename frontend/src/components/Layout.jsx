import { useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './Header';
import SiderComponent from './Sider';

const { Content } = Layout;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderComponent collapsed={collapsed} onCollapse={setCollapsed} />
      
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <HeaderComponent 
          title="课题1：面向动态场景适配的垂域模型多元评估与虚拟验证系统"
          colorBgContainer={colorBgContainer}
        />
        
        <Content style={{ 
          margin: 16, 
          padding: 24, 
          background: colorBgContainer, 
          borderRadius: borderRadiusLG, 
          minHeight: 'calc(100vh - 112px)', 
          overflow: 'auto' 
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
