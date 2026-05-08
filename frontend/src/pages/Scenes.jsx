import { useState, useRef, useEffect } from 'react';
import { Card, Row, Col, List, Tag, Button, Space, Switch, Slider, Select, Modal, Descriptions, Progress, message } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, StopOutlined, SettingOutlined, ThunderboltOutlined, SyncOutlined } from '@ant-design/icons';
import { useStore } from '../store';

const Scenes = () => {
  const scenes = useStore(state => state.scenes);
  const models = useStore(state => state.models);
  
  const [selectedScene, setSelectedScene] = useState(scenes[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [showDisturbance, setShowDisturbance] = useState(false);
  const [disturbanceConfig, setDisturbanceConfig] = useState({
    deviceFault: false,
    signalLoss: false,
    processFluctuation: false,
    rhythmChange: 50,
    environmentChange: 0
  });
  
  const canvasRef = useRef(null);

  // 模拟3D场景（简化的工厂生产线）
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // 绘制函数
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制背景网格
      ctx.strokeStyle = '#e8e8e8';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      
      // 绘制生产线设备
      const deviceY = canvas.height / 2;
      const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];
      
      for (let i = 0; i < 5; i++) {
        const x = 100 + i * 120;
        
        // 设备主体
        ctx.fillStyle = isRunning ? colors[i] : '#999';
        ctx.globalAlpha = isRunning ? 0.8 : 0.5;
        ctx.fillRect(x, deviceY - 30, 80, 60);
        
        // 设备标签
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`设备${i + 1}`, x + 40, deviceY + 5);
        
        // 运行状态指示
        if (isRunning) {
          ctx.beginPath();
          ctx.arc(x + 70, deviceY - 20, 6, 0, 2 * Math.PI);
          ctx.fillStyle = '#52c41a';
          ctx.fill();
        }
      }
      
      // 绘制传送带
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(60, deviceY + 50);
      ctx.lineTo(canvas.width - 60, deviceY + 50);
      ctx.stroke();
      
      // 传送带动画（运行中）
      if (isRunning) {
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 2;
        for (let i = 0; i < 20; i++) {
          const offset = (Date.now() / 50 + i * 30) % (canvas.width - 120);
          ctx.beginPath();
          ctx.moveTo(60 + offset, deviceY + 46);
          ctx.lineTo(60 + offset, deviceY + 54);
          ctx.stroke();
        }
      }
      
      // 绘制产品（运行中移动）
      if (isRunning) {
        const productX = (Date.now() / 100) % (canvas.width - 120) + 60;
        ctx.fillStyle = '#1890ff';
        ctx.beginPath();
        ctx.arc(productX, deviceY + 50, 8, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // 绘制传感器点位
      for (let i = 0; i < 5; i++) {
        const x = 100 + i * 120;
        ctx.beginPath();
        ctx.arc(x + 40, deviceY - 50, 4, 0, 2 * Math.PI);
        ctx.fillStyle = disturbanceConfig.signalLoss ? '#ff4d4f' : '#52c41a';
        ctx.fill();
      }
      
      // 扰动效果
      if (disturbanceConfig.deviceFault) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        ctx.fillRect(100, deviceY - 50, 80, 130);
        ctx.fillStyle = '#ff4d4f';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('故障', 140, deviceY + 80);
      }
      
      if (disturbanceConfig.processFluctuation) {
        ctx.fillStyle = 'rgba(255, 165, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#faad14';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚠ 工艺波动中', canvas.width / 2, 30);
      }
      
      // 标题
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${selectedScene?.name || '场景'} - 数字孪生可视化`, 10, 25);
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    // 窗口大小变化时重绘
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedScene, isRunning, disturbanceConfig]);

  // 仿真控制
  const handleStart = () => {
    setIsRunning(true);
    message.success('仿真开始');
    
    // 模拟仿真进度
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          message.success('仿真完成');
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const handlePause = () => {
    setIsRunning(false);
    message.info('仿真暂停');
  };

  const handleStop = () => {
    setIsRunning(false);
    setSimulationProgress(0);
    message.warning('仿真停止');
  };

  const statusConfig = {
    '已发布': { color: 'green' },
    '调试中': { color: 'orange' },
    '开发中': { color: 'blue' }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>场景孪生</h2>
      
      <Row gutter={[16, 16]}>
        {/* 左侧：场景列表 */}
        <Col xs={24} lg={6}>
          <Card 
            title="场景列表" 
            bordered={false}
            extra={<Button type="link">新建场景</Button>}
          >
            <List
              dataSource={scenes}
              renderItem={(item) => (
                <List.Item 
                  style={{ cursor: 'pointer', padding: '12px 0' }}
                  onClick={() => setSelectedScene(item)}
                >
                  <List.Item.Meta
                    title={
                      <span style={{ fontWeight: selectedScene?.id === item.id ? 'bold' : 'normal' }}>
                        {item.name}
                      </span>
                    }
                    description={
                      <>
                        <Tag color={statusConfig[item.status]?.color} style={{ marginBottom: 4 }}>
                          {item.status}
                        </Tag>
                        <br />
                        <span style={{ fontSize: 12, color: '#999' }}>
                          {item.level} | {item.process}
                        </span>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 中间：3D可视化区域 */}
        <Col xs={24} lg={12}>
          <Card bordered={false} bodyStyle={{ padding: 0 }}>
            <canvas 
              ref={canvasRef} 
              style={{ 
                width: '100%', 
                height: 400, 
                display: 'block',
                background: '#fafafa'
              }} 
            />
          </Card>
          
          {/* 仿真控制 */}
          <Card title="仿真控制" bordered={false} style={{ marginTop: 16 }}>
            <Space style={{ marginBottom: 16 }}>
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />} 
                onClick={handleStart}
                disabled={isRunning}
              >
                启动
              </Button>
              <Button 
                icon={<PauseCircleOutlined />} 
                onClick={handlePause}
                disabled={!isRunning}
              >
                暂停
              </Button>
              <Button 
                danger 
                icon={<StopOutlined />} 
                onClick={handleStop}
              >
                停止
              </Button>
              <Button 
                icon={<SyncOutlined spin={isRunning} />} 
                onClick={() => setShowDisturbance(true)}
              >
                扰动注入
              </Button>
            </Space>
            
            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>仿真进度</span>
              <span>{simulationProgress}%</span>
            </div>
            <Progress percent={simulationProgress} status={simulationProgress === 100 ? 'success' : 'active'} />
            
            {isRunning && (
              <div style={{ marginTop: 16, padding: 12, background: '#f6ffed', borderRadius: 4, border: '1px solid #b7eb8f' }}>
                <SyncOutlined spin style={{ marginRight: 8, color: '#52c41a' }} />
                <span style={{ color: '#52c41a' }}>仿真运行中...</span>
              </div>
            )}
          </Card>
        </Col>

        {/* 右侧：场景详情 */}
        <Col xs={24} lg={6}>
          <Card title="场景详情" bordered={false}>
            {selectedScene && (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="场景名称">{selectedScene.name}</Descriptions.Item>
                <Descriptions.Item label="场景层级">{selectedScene.level}</Descriptions.Item>
                <Descriptions.Item label="工艺类型">{selectedScene.process}</Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color={statusConfig[selectedScene.status]?.color}>
                    {selectedScene.status}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="设备数量">{selectedScene.devices} 台</Descriptions.Item>
                <Descriptions.Item label="关联模型">{selectedScene.models.length} 个</Descriptions.Item>
                <Descriptions.Item label="创建时间">{selectedScene.createdAt}</Descriptions.Item>
                <Descriptions.Item label="场景描述" span={2}>
                  {selectedScene.description}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Card>
          
          <Card title="关联模型" bordered={false} style={{ marginTop: 16 }}>
            <List
              size="small"
              dataSource={selectedScene?.models || []}
              renderItem={(modelId) => {
                const model = models.find(m => m.id === modelId);
                return (
                  <List.Item>
                    <span>{model?.name || modelId}</span>
                    <Tag color={model?.status === '已验证' ? 'green' : 'orange'}>
                      {model?.status || '未知'}
                    </Tag>
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* 扰动注入弹窗 */}
      <Modal
        title={<><ThunderboltOutlined /> 扰动注入配置</>}
        open={showDisturbance}
        onOk={() => setShowDisturbance(false)}
        onCancel={() => setShowDisturbance(false)}
        width={500}
      >
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>设备故障</span>
            <Switch 
              checked={disturbanceConfig.deviceFault}
              onChange={(checked) => setDisturbanceConfig(prev => ({ ...prev, deviceFault: checked }))}
            />
          </div>
          <p style={{ color: '#999', fontSize: 12 }}>模拟设备突然停机或异常状态</p>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>信号丢失</span>
            <Switch 
              checked={disturbanceConfig.signalLoss}
              onChange={(checked) => setDisturbanceConfig(prev => ({ ...prev, signalLoss: checked }))}
            />
          </div>
          <p style={{ color: '#999', fontSize: 12 }}>模拟传感器信号中断或数据丢失</p>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>工艺波动</span>
            <Switch 
              checked={disturbanceConfig.processFluctuation}
              onChange={(checked) => setDisturbanceConfig(prev => ({ ...prev, processFluctuation: checked }))}
            />
          </div>
          <p style={{ color: '#999', fontSize: 12 }}>模拟工艺参数不稳定或偏差</p>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>节拍变化</span>
            <span>{disturbanceConfig.rhythmChange}%</span>
          </div>
          <Slider 
            value={disturbanceConfig.rhythmChange}
            onChange={(value) => setDisturbanceConfig(prev => ({ ...prev, rhythmChange: value }))}
            min={0}
            max={100}
          />
        </div>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>环境变化</span>
            <span>{disturbanceConfig.environmentChange}°C</span>
          </div>
          <Slider 
            value={disturbanceConfig.environmentChange}
            onChange={(value) => setDisturbanceConfig(prev => ({ ...prev, environmentChange: value }))}
            min={-20}
            max={60}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Scenes;
