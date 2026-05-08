import { useState } from 'react';
import { Table, Card, Tag, Button, Input, Select, Space, Modal, Form, message, Tooltip, Drawer, Descriptions, Progress, Rate } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, RiseOutlined } from '@ant-design/icons';
import { useStore } from '../store';

const Models = () => {
  const models = useStore(state => state.models);
  const filters = useStore(state => state.filters);
  const setFilters = useStore(state => state.setFilters);
  const getFilteredModels = useStore(state => state.getFilteredModels);
  const addModel = useStore(state => state.addModel);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [form] = Form.useForm();

  const filteredModels = getFilteredModels();

  const statusConfig = {
    '已验证': { color: 'green', icon: <CheckCircleOutlined /> },
    '验证中': { color: 'blue', icon: <ClockCircleOutlined /> },
    '验证失败': { color: 'red', icon: <CloseCircleOutlined /> },
    '已推荐': { color: 'purple', icon: <RiseOutlined /> },
    '已入库': { color: 'cyan', icon: <CheckCircleOutlined /> }
  };

  const handleSearch = (value) => {
    // 简单实现，实际应该模糊搜索
  };

  const handleAddModel = () => {
    form.validateFields().then(values => {
      addModel({
        ...values,
        status: '待审核',
        accuracy: 0,
        latency: 0,
        metrics: { efficiency: 0, quality: 0, cost: 0, safety: 0 },
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
      message.success('模型添加成功！');
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const showDetail = (record) => {
    setSelectedModel(record);
    setIsDetailOpen(true);
  };

  const columns = [
    {
      title: '模型名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => showDetail(record)}>{text}</a>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: '检测', value: '检测' },
        { text: '规划', value: '规划' },
        { text: '识别', value: '识别' }
      ],
      onFilter: (value, record) => record.type === value
    },
    {
      title: '行业',
      dataIndex: 'industry',
      key: 'industry'
    },
    {
      title: '工艺',
      dataIndex: 'process',
      key: 'process'
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const config = statusConfig[status] || { color: 'default' };
        return <Tag color={config.color} icon={config.icon}>{status}</Tag>;
      }
    },
    {
      title: '准确率',
      dataIndex: 'accuracy',
      key: 'accuracy',
      sorter: (a, b) => a.accuracy - b.accuracy,
      render: (val) => (
        <Tooltip title={`准确率: ${val}%`}>
          <Progress percent={val} size="small" steps={5} strokeColor={val >= 95 ? '#52c41a' : val >= 90 ? '#faad14' : '#ff4d4f'} />
        </Tooltip>
      )
    },
    {
      title: '延迟(ms)',
      dataIndex: 'latency',
      key: 'latency',
      sorter: (a, b) => a.latency - b.latency,
      render: (val) => <span style={{ color: val <= 50 ? '#52c41a' : val <= 100 ? '#faad14' : '#ff4d4f' }}>{val}</span>
    },
    {
      title: '责任人',
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="查看详情">
            <Button type="link" icon={<EyeOutlined />} onClick={() => showDetail(record)} />
          </Tooltip>
          <Tooltip title="编辑">
            <Button type="link" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>模型管理</h2>
      
      {/* 筛选区域 */}
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input.Search
            placeholder="搜索模型名称"
            allowClear
            onSearch={handleSearch}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="模型类型"
            allowClear
            style={{ width: 120 }}
            onChange={(val) => setFilters({ modelType: val })}
            value={filters.modelType}
          >
            <Select.Option value="检测">检测</Select.Option>
            <Select.Option value="规划">规划</Select.Option>
            <Select.Option value="识别">识别</Select.Option>
            <Select.Option value="控制">控制</Select.Option>
          </Select>
          <Select
            placeholder="所属行业"
            allowClear
            style={{ width: 140 }}
            onChange={(val) => setFilters({ industry: val })}
            value={filters.industry}
          >
            <Select.Option value="汽车制造">汽车制造</Select.Option>
            <Select.Option value="航空航天">航空航天</Select.Option>
            <Select.Option value="船舶制造">船舶制造</Select.Option>
            <Select.Option value="电子制造">电子制造</Select.Option>
          </Select>
          <Select
            placeholder="工艺类型"
            allowClear
            style={{ width: 120 }}
            onChange={(val) => setFilters({ process: val })}
            value={filters.process}
          >
            <Select.Option value="焊接">焊接</Select.Option>
            <Select.Option value="打磨">打磨</Select.Option>
            <Select.Option value="装配">装配</Select.Option>
            <Select.Option value="分拣">分拣</Select.Option>
          </Select>
          <Select
            placeholder="验证状态"
            allowClear
            style={{ width: 120 }}
            onChange={(val) => setFilters({ status: val })}
            value={filters.status}
          >
            <Select.Option value="已验证">已验证</Select.Option>
            <Select.Option value="验证中">验证中</Select.Option>
            <Select.Option value="验证失败">验证失败</Select.Option>
            <Select.Option value="已推荐">已推荐</Select.Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            注册模型
          </Button>
        </Space>
      </Card>

      {/* 模型列表 */}
      <Card bordered={false}>
        <Table 
          columns={columns} 
          dataSource={filteredModels} 
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
        />
      </Card>

      {/* 添加模型弹窗 */}
      <Modal
        title="注册新模型"
        open={isModalOpen}
        onOk={handleAddModel}
        onCancel={() => { setIsModalOpen(false); form.resetFields(); }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="模型名称" rules={[{ required: true }]}>
            <Input placeholder="请输入模型名称" />
          </Form.Item>
          <Space style={{ width: '100%' }}>
            <Form.Item name="type" label="模型类型" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Select>
                <Select.Option value="检测">检测</Select.Option>
                <Select.Option value="规划">规划</Select.Option>
                <Select.Option value="识别">识别</Select.Option>
                <Select.Option value="控制">控制</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="industry" label="所属行业" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Select>
                <Select.Option value="汽车制造">汽车制造</Select.Option>
                <Select.Option value="航空航天">航空航天</Select.Option>
                <Select.Option value="船舶制造">船舶制造</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Space style={{ width: '100%' }}>
            <Form.Item name="process" label="适用工艺" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Select>
                <Select.Option value="焊接">焊接</Select.Option>
                <Select.Option value="打磨">打磨</Select.Option>
                <Select.Option value="装配">装配</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="version" label="版本号" rules={[{ required: true }]} style={{ flex: 1 }}>
              <Input placeholder="如: 1.0.0" />
            </Form.Item>
          </Space>
          <Form.Item name="description" label="模型描述">
            <Input.TextArea rows={3} placeholder="请输入模型描述" />
          </Form.Item>
          <Form.Item name="owner" label="责任人" rules={[{ required: true }]}>
            <Input placeholder="请输入责任人" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 模型详情抽屉 */}
      <Drawer
        title="模型详情"
        placement="right"
        width={640}
        onClose={() => setIsDetailOpen(false)}
        open={isDetailOpen}
      >
        {selectedModel && (
          <>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="模型名称" span={2}>{selectedModel.name}</Descriptions.Item>
              <Descriptions.Item label="模型ID">{selectedModel.id}</Descriptions.Item>
              <Descriptions.Item label="版本">{selectedModel.version}</Descriptions.Item>
              <Descriptions.Item label="类型">{selectedModel.type}</Descriptions.Item>
              <Descriptions.Item label="行业">{selectedModel.industry}</Descriptions.Item>
              <Descriptions.Item label="工艺">{selectedModel.process}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={statusConfig[selectedModel.status]?.color}>
                  {selectedModel.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="责任人">{selectedModel.owner}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedModel.createdAt}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{selectedModel.updatedAt}</Descriptions.Item>
              <Descriptions.Item label="模型描述" span={2}>{selectedModel.description}</Descriptions.Item>
            </Descriptions>

            <Card title="性能指标" size="small" style={{ marginTop: 16 }}>
              <Descriptions column={2}>
                <Descriptions.Item label="准确率">
                  <span style={{ color: selectedModel.accuracy >= 95 ? '#52c41a' : '#faad14' }}>
                    {selectedModel.accuracy}%
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="推理延迟">
                  <span style={{ color: selectedModel.latency <= 50 ? '#52c41a' : '#faad14' }}>
                    {selectedModel.latency}ms
                  </span>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="综合评分" size="small" style={{ marginTop: 16 }}>
              <Descriptions column={2}>
                <Descriptions.Item label="效率">
                  <Progress percent={selectedModel.metrics.efficiency} size="small" />
                </Descriptions.Item>
                <Descriptions.Item label="质量">
                  <Progress percent={selectedModel.metrics.quality} size="small" />
                </Descriptions.Item>
                <Descriptions.Item label="成本">
                  <Progress percent={selectedModel.metrics.cost} size="small" />
                </Descriptions.Item>
                <Descriptions.Item label="安全">
                  <Progress percent={selectedModel.metrics.safety} size="small" />
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="专家评价" size="small" style={{ marginTop: 16 }}>
              <Rate disabled defaultValue={4} allowHalf />
              <p style={{ marginTop: 8, color: '#666' }}>
                该模型在焊接质量检测场景下表现优秀，建议在类似场景推广应用。
              </p>
            </Card>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default Models;
