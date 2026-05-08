import { useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const login = useStore(state => state.login);

  const onFinish = (values) => {
    setLoading(true);
    
    // 模拟登录
    setTimeout(() => {
      const user = {
        id: 'U001',
        name: '演示用户',
        role: values.role || '算法工程师',
        department: 'AI研发部'
      };
      
      login(user);
      message.success('登录成功！');
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card
        style={{
          width: 400,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          borderRadius: 16
        }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#333' }}>
            垂域模型评估系统
          </h1>
          <p style={{ color: '#666', fontSize: 14 }}>
            面向动态场景适配的多元评估与虚拟验证
          </p>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
            initialValue="admin"
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名（默认：admin）"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
            initialValue="123456"
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码（默认：123456）"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="选择角色"
            initialValue="算法工程师"
          >
            <Select>
              <Select.Option value="算法工程师">算法工程师</Select.Option>
              <Select.Option value="工艺专家">工艺专家</Select.Option>
              <Select.Option value="测试人员">测试人员</Select.Option>
              <Select.Option value="平台管理员">平台管理员</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{ height: 44, borderRadius: 8 }}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', color: '#999', fontSize: 12 }}>
          <p>演示模式：点击登录即可进入系统</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
