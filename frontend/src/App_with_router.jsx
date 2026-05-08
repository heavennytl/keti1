import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Button, Card, Layout, Menu } from 'antd';
import { UserOutlined, AppstoreOutlined, ExperimentOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function Home() {
  return (
    <div>
      <h2>首页看板</h2>
      <Card title="欢迎">
        <p>这是首页内容区域</p>
      </Card>
    </div>
  );
}

function Models() {
  return (
    <div>
      <h2>模型管理</h2>
      <Card title="模型列表">
        <p>这里是模型管理页面</p>
      </Card>
    </div>
  );
}

function Metrics() {
  return (
    <div>
      <h2>评测指标</h2>
      <Card title="指标管理">
        <p>这里是评测指标页面</p>
      </Card>
    </div>
  );
}

function App_with_router() {
  const menuItems = [
    { key: '/dashboard', icon: <AppstoreOutlined />, label: '首页看板' },
    { key: '/models', icon: <UserOutlined />, label: '模型管理' },
    { key: '/metrics', icon: <ExperimentOutlined />, label: '评测指标' }
  ];

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider theme="dark" width={200}>
            <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              垂域评估系统
            </div>
            <Menu theme="dark" mode="inline" items={menuItems} />
          </Sider>
          
          <Layout>
            <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: 16, fontWeight: 500 }}>面向动态场景适配的垂域模型多元评估系统</div>
            </Header>
            
            <Content style={{ margin: 16, padding: 24, background: '#fff', minHeight: 'calc(100vh - 112px)', overflow: 'auto' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/models" element={<Models />} />
                <Route path="/metrics" element={<Metrics />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App_with_router;