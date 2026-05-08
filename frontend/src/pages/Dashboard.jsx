import { Row, Col, Card, Statistic, Progress, List, Tag, Table } from 'antd';
import { 
  AppstoreOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
  RiseOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { useStore } from '../store';

const Dashboard = () => {
  const dashboard = useStore(state => state.dashboard);
  const reports = useStore(state => state.reports);
  const models = useStore(state => state.models);

  // 趋势图配置
  const trendOption = {
    title: { text: '模型数量趋势', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['模型总数', '测试数量'], bottom: 0 },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
    yAxis: [
      { type: 'value', name: '数量' },
      { type: 'value', name: '测试数', axisLine: { show: true, lineStyle: { color: '#1890ff' } } }
    ],
    series: [
      { name: '模型总数', type: 'bar', data: dashboard.trend.models, itemStyle: { color: '#52c41a' } },
      { name: '测试数量', type: 'line', yAxisIndex: 1, data: dashboard.trend.tests, itemStyle: { color: '#1890ff' } }
    ]
  };

  // 通过率趋势图
  const passRateOption = {
    title: { text: '测试通过率趋势', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
    yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
    series: [{
      type: 'line',
      data: dashboard.trend.passRate,
      areaStyle: { color: 'rgba(82, 196, 26, 0.2)' },
      itemStyle: { color: '#52c41a' },
      smooth: true
    }]
  };

  // 模型状态分布
  const statusOption = {
    title: { text: '模型状态分布', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 15, name: '已验证', itemStyle: { color: '#52c41a' } },
        { value: 8, name: '验证中', itemStyle: { color: '#1890ff' } },
        { value: 3, name: '验证失败', itemStyle: { color: '#ff4d4f' } },
        { value: 2, name: '已推荐', itemStyle: { color: '#722ed1' } }
      ]
    }]
  };

  // 近期报告列表
  const recentReports = reports.slice(0, 5);

  const statusColumns = [
    { title: '模型名称', dataIndex: 'name', key: 'name' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => {
        const statusMap = {
          '已验证': { color: 'green', icon: <CheckCircleOutlined /> },
          '验证中': { color: 'blue', icon: <ClockCircleOutlined /> },
          '验证失败': { color: 'red', icon: <CloseCircleOutlined /> },
          '已推荐': { color: 'purple', icon: <RiseOutlined /> }
        };
        const config = statusMap[status] || { color: 'default' };
        return <Tag color={config.color} icon={config.icon}>{status}</Tag>;
      }
    },
    { title: '责任人', dataIndex: 'owner', key: 'owner' }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>数据看板</h2>
      
      {/* 核心指标卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="模型总数"
              value={dashboard.totalModels}
              prefix={<AppstoreOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: 8, color: '#52c41a', fontSize: 14 }}>
              <RiseOutlined /> 较上月 +4
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="已验证模型"
              value={dashboard.verifiedModels}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
            <Progress percent={54} showInfo={false} strokeColor="#52c41a" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="待验证模型"
              value={dashboard.pendingModels}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
            <Progress percent={28} showInfo={false} strokeColor="#faad14" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="验证失败"
              value={dashboard.failedModels}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
            <Progress percent={11} showInfo={false} strokeColor="#ff4d4f" />
          </Card>
        </Col>
      </Row>

      {/* 场景和测试统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="场景总数"
              value={dashboard.totalScenes}
              prefix={<ExperimentOutlined style={{ color: '#722ed1' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="活跃场景"
              value={dashboard.activeScenes}
              suffix={`/ ${dashboard.totalScenes}`}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="测试总数"
              value={dashboard.totalTests}
              prefix={<FileTextOutlined style={{ color: '#13c2c2' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="通过率"
              value={dashboard.passRate}
              suffix="%"
              valueStyle={{ color: dashboard.passRate >= 80 ? '#52c41a' : '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card bordered={false}>
            <ReactECharts option={trendOption} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false}>
            <ReactECharts option={passRateOption} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>

      {/* 模型状态和近期报告 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card bordered={false} title="模型状态分布">
            <ReactECharts option={statusOption} style={{ height: 280 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card bordered={false} title="近期验证报告">
            <List
              size="small"
              dataSource={recentReports}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="#">{item.title}</a>}
                    description={`${item.type} | ${item.createdAt}`}
                  />
                  <Tag color={item.status === '已归档' ? 'green' : 'orange'}>
                    {item.status}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 待处理问题 */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card bordered={false} title="需要关注的模型">
            <Table 
              columns={statusColumns} 
              dataSource={models.filter(m => m.status === '验证失败' || m.status === '验证中').slice(0, 5)} 
              rowKey="id" 
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
