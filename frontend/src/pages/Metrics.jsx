import { useState } from 'react';
import { Card, Row, Col, Tree, Slider, Button, Space, Table, Tag, Progress, Modal, message } from 'antd';
import { ExperimentOutlined, CheckCircleOutlined, WarningOutlined, SettingOutlined, ReloadOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { useStore } from '../store';

const Metrics = () => {
  const metrics = useStore(state => state.metrics);
  const weights = useStore(state => state.weights);
  const updateWeights = useStore(state => state.updateWeights);
  const models = useStore(state => state.models);
  
  const [localWeights, setLocalWeights] = useState(weights);
  const [selectedModel, setSelectedModel] = useState(models[0]);

  // 雷达图配置
  const radarOption = {
    title: { text: `${selectedModel?.name || '模型'} 评测结果`, left: 'center' },
    tooltip: {},
    radar: {
      indicator: [
        { name: '效率', max: 100 },
        { name: '质量', max: 100 },
        { name: '成本', max: 100 },
        { name: '安全', max: 100 },
        { name: '环境', max: 100 }
      ],
      radius: '65%'
    },
    series: [{
      type: 'radar',
      data: [{
        value: [
          selectedModel?.metrics.efficiency || 0,
          selectedModel?.metrics.quality || 0,
          selectedModel?.metrics.cost || 0,
          selectedModel?.metrics.safety || 0,
          88
        ],
        name: '评测结果',
        areaStyle: { color: 'rgba(24, 144, 255, 0.3)' },
        lineStyle: { color: '#1890ff' },
        itemStyle: { color: '#1890ff' }
      }]
    }]
  };

  // 综合评分计算
  const calculateScore = () => {
    const score = (
      (localWeights.efficiency / 100) * (selectedModel?.metrics.efficiency || 0) +
      (localWeights.quality / 100) * (selectedModel?.metrics.quality || 0) +
      (localWeights.cost / 100) * (selectedModel?.metrics.cost || 0) +
      (localWeights.safety / 100) * (selectedModel?.metrics.safety || 0) +
      (localWeights.environment / 100) * 88
    );
    return score.toFixed(1);
  };

  const handleWeightChange = (dimension, value) => {
    setLocalWeights(prev => ({ ...prev, [dimension]: value }));
  };

  const handleSaveWeights = () => {
    updateWeights(localWeights);
    message.success('权重配置已保存');
  };

  const handleResetWeights = () => {
    setLocalWeights(weights);
    message.info('权重已重置为默认');
  };

  // 指标树数据
  const treeData = [
    {
      title: '效率',
      key: 'L1-1',
      icon: <CheckCircleOutlined style={{ color: '#1890ff' }} />,
      children: [
        { title: '推理速度', key: 'L2-1-1' },
        { title: '吞吐量', key: 'L2-1-2' },
        { title: '资源利用率', key: 'L2-1-3' }
      ]
    },
    {
      title: '质量',
      key: 'L1-2',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      children: [
        { title: '准确率', key: 'L2-2-1' },
        { title: '召回率', key: 'L2-2-2' },
        { title: 'F1值', key: 'L2-2-3' }
      ]
    },
    {
      title: '成本',
      key: 'L1-3',
      icon: <WarningOutlined style={{ color: '#faad14' }} />,
      children: [
        { title: '算力需求', key: 'L2-3-1' },
        { title: '存储需求', key: 'L2-3-2' }
      ]
    },
    {
      title: '安全',
      key: 'L1-4',
      icon: <WarningOutlined style={{ color: '#f5222d' }} />,
      children: [
        { title: '可靠性', key: 'L2-4-1' },
        { title: '容错性', key: 'L2-4-2' }
      ]
    },
    {
      title: '环境',
      key: 'L1-5',
      icon: <ExperimentOutlined style={{ color: '#722ed1' }} />,
      children: [
        { title: '场景适应性', key: 'L2-5-1' },
        { title: '抗干扰能力', key: 'L2-5-2' }
      ]
    }
  ];

  // 指标数据表格
  const metricsColumns = [
    { title: '指标名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { 
      title: '当前值', 
      dataIndex: 'value', 
      key: 'value',
      render: (val) => <Progress percent={val} size="small" />
    },
    { 
      title: '阈值', 
      key: 'threshold',
      render: () => <span>90 - 100</span>
    },
    { 
      title: '状态', 
      key: 'status',
      render: () => <Tag color="green">达标</Tag>
    }
  ];

  const metricsData = [
    { name: '准确率', type: '质量', value: selectedModel?.metrics.quality || 0 },
    { name: '推理速度', type: '效率', value: selectedModel?.metrics.efficiency || 0 },
    { name: '算力需求', type: '成本', value: selectedModel?.metrics.cost || 0 },
    { name: '可靠性', type: '安全', value: selectedModel?.metrics.safety || 0 },
    { name: '场景适应性', type: '环境', value: 88 }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>评测指标管理</h2>
      
      <Row gutter={[16, 16]}>
        {/* 左侧：指标树 */}
        <Col xs={24} lg={6}>
          <Card title="指标体系" bordered={false}>
            <Tree
              showIcon
              defaultExpandAll
              treeData={treeData}
              style={{ background: 'transparent' }}
            />
          </Card>
        </Col>

        {/* 中间：雷达图和评分 */}
        <Col xs={24} lg={12}>
          <Card bordered={false}>
            <ReactECharts option={radarOption} style={{ height: 400 }} />
          </Card>
          
          {/* 综合评分 */}
          <Card title="综合评分" bordered={false} style={{ marginTop: 16 }}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, fontWeight: 'bold', color: '#1890ff' }}>
                {calculateScore()}
              </div>
              <div style={{ color: '#666', marginTop: 8 }}>综合评分（满分100）</div>
            </div>
          </Card>
        </Col>

        {/* 右侧：权重配置 */}
        <Col xs={24} lg={6}>
          <Card 
            title={<><SettingOutlined /> 权重配置</>} 
            bordered={false}
            extra={
              <Space>
                <Button size="small" icon={<ReloadOutlined />} onClick={handleResetWeights}>重置</Button>
                <Button type="primary" size="small" onClick={handleSaveWeights}>保存</Button>
              </Space>
            }
          >
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>效率</span>
                <span>{localWeights.efficiency}%</span>
              </div>
              <Slider 
                value={localWeights.efficiency} 
                onChange={(v) => handleWeightChange('efficiency', v)}
                marks={{ 0: '0', 50: '50', 100: '100' }}
              />
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>质量</span>
                <span>{localWeights.quality}%</span>
              </div>
              <Slider 
                value={localWeights.quality} 
                onChange={(v) => handleWeightChange('quality', v)}
                marks={{ 0: '0', 50: '50', 100: '100' }}
              />
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>成本</span>
                <span>{localWeights.cost}%</span>
              </div>
              <Slider 
                value={localWeights.cost} 
                onChange={(v) => handleWeightChange('cost', v)}
                marks={{ 0: '0', 50: '50', 100: '100' }}
              />
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>安全</span>
                <span>{localWeights.safety}%</span>
              </div>
              <Slider 
                value={localWeights.safety} 
                onChange={(v) => handleWeightChange('safety', v)}
                marks={{ 0: '0', 50: '50', 100: '100' }}
              />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>环境</span>
                <span>{localWeights.environment}%</span>
              </div>
              <Slider 
                value={localWeights.environment} 
                onChange={(v) => handleWeightChange('environment', v)}
                marks={{ 0: '0', 50: '50', 100: '100' }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 底部：指标数据表格 */}
      <Card title="指标详情" bordered={false} style={{ marginTop: 16 }}>
        <Table 
          columns={metricsColumns} 
          dataSource={metricsData} 
          rowKey="name"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Metrics;
