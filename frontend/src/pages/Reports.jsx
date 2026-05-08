import { Card, Row, Col, List, Tag, Button, Table, Tabs, Space, Modal, Descriptions, Timeline, message } from 'antd';
import { FileTextOutlined, DownloadOutlined, EyeOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useStore } from '../store';

const Reports = () => {
  const reports = useStore(state => state.reports);
  const models = useStore(state => state.models);

  const statusConfig = {
    '已归档': { color: 'green', icon: <CheckCircleOutlined /> },
    '待审核': { color: 'orange', icon: <ClockCircleOutlined /> },
    '草稿': { color: 'default', icon: <ExclamationCircleOutlined /> }
  };

  const typeConfig = {
    '验证报告': 'blue',
    '评审报告': 'purple',
    '阶段报告': 'cyan',
    '终期报告': 'red'
  };

  const handlePreview = (report) => {
    Modal.info({
      title: report.title,
      width: 700,
      content: (
        <div>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="报告编号">{report.id}</Descriptions.Item>
            <Descriptions.Item label="报告类型">
              <Tag color={typeConfig[report.type]}>{report.type}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="关联模型">{report.model}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{report.createdAt}</Descriptions.Item>
            <Descriptions.Item label="创建人">{report.creator}</Descriptions.Item>
            <Descriptions.Item label="状态">
              <Tag color={statusConfig[report.status]?.color}>{report.status}</Tag>
            </Descriptions.Item>
          </Descriptions>
          
          <h4 style={{ marginTop: 16, marginBottom: 8 }}>验证过程</h4>
          <Timeline
            items={[
              { children: '测试方案审核通过 - 2026-03-10' },
              { children: '开始执行虚拟验证 - 2026-03-12' },
              { children: '完成指标评测 - 2026-03-14' },
              { children: '生成验证报告 - 2026-03-15' }
            ]}
          />
          
          <h4 style={{ marginTop: 16, marginBottom: 8 }}>评测结果摘要</h4>
          <Descriptions bordered column={2} size="small">
            <Descriptions.Item label="准确率">96.8%</Descriptions.Item>
            <Descriptions.Item label="推理延迟">45ms</Descriptions.Item>
            <Descriptions.Item label="综合评分">92.5</Descriptions.Item>
            <Descriptions.Item label="评测结论">通过</Descriptions.Item>
          </Descriptions>
        </div>
      ),
      onOk() {},
    });
  };

  const handleDownload = (report) => {
    message.success(`正在下载报告: ${report.title}`);
  };

  const columns = [
    { title: '报告标题', dataIndex: 'title', key: 'title' },
    { 
      title: '类型', 
      dataIndex: 'type', 
      key: 'type',
      render: (type) => <Tag color={typeConfig[type]}>{type}</Tag>
    },
    { title: '关联模型', dataIndex: 'model', key: 'model' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '创建人', dataIndex: 'creator', key: 'creator' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => {
        const config = statusConfig[status];
        return <Tag color={config?.color} icon={config?.icon}>{status}</Tag>;
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handlePreview(record)}>预览</Button>
          <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownload(record)}>下载</Button>
        </Space>
      )
    }
  ];

  const tabItems = [
    {
      key: 'all',
      label: `全部报告 (${reports.length})`,
      children: (
        <Table 
          columns={columns} 
          dataSource={reports} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )
    },
    {
      key: 'verified',
      label: `验证报告 (${reports.filter(r => r.type === '验证报告').length})`,
      children: (
        <Table 
          columns={columns} 
          dataSource={reports.filter(r => r.type === '验证报告')} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )
    },
    {
      key: 'review',
      label: `评审报告 (${reports.filter(r => r.type === '评审报告').length})`,
      children: (
        <Table 
          columns={columns} 
          dataSource={reports.filter(r => r.type === '评审报告')} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )
    },
    {
      key: 'summary',
      label: `阶段报告 (${reports.filter(r => r.type === '阶段报告').length})`,
      children: (
        <Table 
          columns={columns} 
          dataSource={reports.filter(r => r.type === '阶段报告')} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )
    }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>报告中心</h2>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FileTextOutlined style={{ fontSize: 32, color: '#1890ff', marginRight: 16 }} />
              <div>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>{reports.length}</div>
                <div style={{ color: '#666' }}>报告总数</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlined style={{ fontSize: 32, color: '#52c41a', marginRight: 16 }} />
              <div>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {reports.filter(r => r.status === '已归档').length}
                </div>
                <div style={{ color: '#666' }}>已归档</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ClockCircleOutlined style={{ fontSize: 32, color: '#faad14', marginRight: 16 }} />
              <div>
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                  {reports.filter(r => r.status === '待审核').length}
                </div>
                <div style={{ color: '#666' }}>待审核</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 报告列表 */}
      <Card bordered={false}>
        <Tabs items={tabItems} />
      </Card>
    </div>
  );
};

export default Reports;
