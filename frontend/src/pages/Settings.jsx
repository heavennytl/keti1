import { Card, Form, Input, Switch, Button, message, Table, Tag, Space, Divider } from 'antd';
import { SaveOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Settings = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success('系统配置已保存');
  };

  const handleSaveRole = () => {
    message.success('角色配置已保存');
  };

  // 角色配置数据
  const roleColumns = [
    { title: '角色名称', dataIndex: 'name', key: 'name' },
    { title: '角色编码', dataIndex: 'code', key: 'code' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '状态', dataIndex: 'status', key: 'status', render: () => <Tag color="green">启用</Tag> },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      )
    }
  ];

  const roleData = [
    { name: '平台管理员', code: 'ADMIN', description: '系统管理员，负责系统配置' },
    { name: '算法工程师', code: 'ALGORITHM', description: '负责模型开发和上传' },
    { name: '工艺专家', code: 'EXPERT', description: '负责场景配置和指标权重' },
    { name: '测试执行人员', code: 'TESTER', description: '负责执行测试和采集结果' },
    { name: '审核人员', code: 'AUDITOR', description: '负责审核测试方案和模型' },
    { name: '普通用户', code: 'USER', description: '查看模型和报告' }
  ];

  // 字典配置数据
  const dictColumns = [
    { title: '字典类型', dataIndex: 'type', key: 'type' },
    { title: '字典项', dataIndex: 'items', key: 'items', render: (items) => items.join(', ') },
    { title: '操作', key: 'action', render: () => <Button type="link">编辑</Button> }
  ];

  const dictData = [
    { type: '模型类型', items: ['检测', '规划', '控制', '识别', '推荐'] },
    { type: '工艺类型', items: ['焊接', '打磨', '装配', '喷涂', '检测'] },
    { type: '场景级别', items: ['设备级', '工站级', '产线级'] },
    { type: '验证状态', items: ['草稿', '待审核', '已入库', '验证中', '验证完成', '已推荐', '已下线'] }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>系统设置</h2>
      
      {/* 基础配置 */}
      <Card title="基础配置" bordered={false} style={{ marginBottom: 16 }}>
        <Form form={form} layout="vertical" initialValues={{ systemName: '垂域模型评估系统', version: '1.0.0', timeout: 30 }}>
          <Form.Item name="systemName" label="系统名称">
            <Input placeholder="请输入系统名称" />
          </Form.Item>
          <Form.Item name="version" label="系统版本">
            <Input placeholder="请输入系统版本" disabled />
          </Form.Item>
          <Form.Item name="timeout" label="会话超时时间（分钟）">
            <Input type="number" placeholder="请输入超时时间" />
          </Form.Item>
          <Form.Item name="maintenance" label="维护模式" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              保存配置
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 角色配置 */}
      <Card 
        title="角色配置" 
        bordered={false} 
        style={{ marginBottom: 16 }}
        extra={<Button type="primary" icon={<PlusOutlined />}>新增角色</Button>}
      >
        <Table columns={roleColumns} dataSource={roleData} rowKey="code" pagination={false} />
      </Card>

      {/* 字典配置 */}
      <Card 
        title="字典配置" 
        bordered={false} 
        style={{ marginBottom: 16 }}
        extra={<Button type="primary" icon={<PlusOutlined />}>新增字典</Button>}
      >
        <Table columns={dictColumns} dataSource={dictData} rowKey="type" pagination={false} />
      </Card>

      {/* 通知配置 */}
      <Card title="通知配置" bordered={false}>
        <Form layout="vertical">
          <Form.Item label="邮件通知" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item label="站内消息" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item label="待办提醒" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Form.Item label="异常告警" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>
          <Divider />
          <Form.Item label="SMTP服务器">
            <Input placeholder="smtp.example.com" />
          </Form.Item>
          <Form.Item label="发件人邮箱">
            <Input placeholder="noreply@example.com" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
