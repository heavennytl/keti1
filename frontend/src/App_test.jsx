import { Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function App_test() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: 40,
      background: '#f0f0f0'
    }}>
      <Card title="Ant Design 组件测试" style={{ maxWidth: 400, margin: '0 auto' }}>
        <Button type="primary" icon={<UserOutlined />}>
          Ant Design 按钮
        </Button>
        <p style={{ marginTop: 20 }}>如果看到这个按钮和卡片，说明Ant Design正常工作</p>
      </Card>
    </div>
  );
}

export default App_test;