// Mock 数据 - 模型管理

export const mockModels = [
  {
    id: 'M001',
    name: '焊接质量检测模型',
    type: '检测',
    industry: '汽车制造',
    process: '焊接',
    version: '2.1.0',
    status: '已验证',
    accuracy: 96.8,
    latency: 45,
    owner: '张三',
    createdAt: '2025-12-01',
    updatedAt: '2026-03-15',
    metrics: {
      efficiency: 92,
      quality: 96,
      cost: 85,
      safety: 94
    },
    description: '基于深度学习的焊接缺陷检测模型，支持多种焊接类型'
  },
  {
    id: 'M002',
    name: '打磨表面质量评估模型',
    type: '检测',
    industry: '航空航天',
    process: '打磨',
    version: '1.5.2',
    status: '验证中',
    accuracy: 94.2,
    latency: 38,
    owner: '李四',
    createdAt: '2026-01-10',
    updatedAt: '2026-04-20',
    metrics: {
      efficiency: 88,
      quality: 94,
      cost: 78,
      safety: 90
    },
    description: '用于评估打磨表面粗糙度和缺陷的视觉检测模型'
  },
  {
    id: 'M003',
    name: '装配路径规划模型',
    type: '规划',
    industry: '汽车制造',
    process: '装配',
    version: '3.0.1',
    status: '已推荐',
    accuracy: 98.5,
    latency: 120,
    owner: '王五',
    createdAt: '2025-08-20',
    updatedAt: '2026-02-28',
    metrics: {
      efficiency: 95,
      quality: 98,
      cost: 92,
      safety: 96
    },
    description: '基于强化学习的装配顺序和路径优化模型'
  },
  {
    id: 'M004',
    name: '焊缝识别定位模型',
    type: '识别',
    industry: '船舶制造',
    process: '焊接',
    version: '1.2.0',
    status: '已入库',
    accuracy: 92.1,
    latency: 55,
    owner: '赵六',
    createdAt: '2026-02-15',
    updatedAt: '2026-04-10',
    metrics: {
      efficiency: 85,
      quality: 92,
      cost: 80,
      safety: 88
    },
    description: '用于自动识别和定位焊缝位置的视觉模型'
  },
  {
    id: 'M005',
    name: '零件分拣识别模型',
    type: '识别',
    industry: '电子制造',
    process: '分拣',
    version: '2.0.0',
    status: '验证失败',
    accuracy: 87.3,
    latency: 42,
    owner: '孙七',
    createdAt: '2026-03-01',
    updatedAt: '2026-04-25',
    metrics: {
      efficiency: 78,
      quality: 87,
      cost: 72,
      safety: 82
    },
    description: '用于工业零件自动分拣的视觉识别模型'
  }
];

export const mockScenes = [
  {
    id: 'S001',
    name: '汽车车身焊接场景',
    level: '产线级',
    process: '焊接',
    status: '已发布',
    devices: 12,
    models: ['M001', 'M004'],
    description: '完整的汽车车身焊接生产线数字孪生场景',
    createdAt: '2025-11-01'
  },
  {
    id: 'S002',
    name: '航空发动机打磨场景',
    level: '工站级',
    process: '打磨',
    status: '调试中',
    devices: 4,
    models: ['M002'],
    description: '航空发动机叶片表面处理工站孪生场景',
    createdAt: '2026-01-15'
  },
  {
    id: 'S003',
    name: '车门装配线场景',
    level: '产线级',
    process: '装配',
    status: '已发布',
    devices: 8,
    models: ['M003'],
    description: '汽车车门自动化装配线孪生验证场景',
    createdAt: '2025-09-20'
  }
];

export const mockMetrics = {
  level1: [
    { id: 'L1-1', name: '效率', icon: 'Speed', color: '#1890ff' },
    { id: 'L1-2', name: '质量', icon: 'CheckCircle', color: '#52c41a' },
    { id: 'L1-3', name: '成本', icon: 'Dollar', color: '#faad14' },
    { id: 'L1-4', name: '安全', icon: 'Safety', color: '#f5222d' },
    { id: 'L1-5', name: '环境', icon: 'Environment', color: '#722ed1' }
  ],
  level2: {
    'L1-1': [
      { id: 'L2-1-1', name: '推理速度' },
      { id: 'L2-1-2', name: '吞吐量' },
      { id: 'L2-1-3', name: '资源利用率' }
    ],
    'L1-2': [
      { id: 'L2-2-1', name: '准确率' },
      { id: 'L2-2-2', name: '召回率' },
      { id: 'L2-2-3', name: 'F1值' }
    ],
    'L1-3': [
      { id: 'L2-3-1', name: '算力需求' },
      { id: 'L2-3-2', name: '存储需求' }
    ],
    'L1-4': [
      { id: 'L2-4-1', name: '可靠性' },
      { id: 'L2-4-2', name: '容错性' }
    ],
    'L1-5': [
      { id: 'L2-5-1', name: '场景适应性' },
      { id: 'L2-5-2', name: '抗干扰能力' }
    ]
  }
};

export const mockWeights = {
  efficiency: 0.25,
  quality: 0.35,
  cost: 0.15,
  safety: 0.15,
  environment: 0.10
};

export const mockDashboard = {
  totalModels: 28,
  verifiedModels: 15,
  pendingModels: 8,
  failedModels: 3,
  totalScenes: 12,
  activeScenes: 5,
  totalTests: 156,
  passedTests: 128,
  passRate: 82.1,
  trend: {
    models: [20, 22, 24, 26, 28],
    tests: [120, 130, 140, 150, 156],
    passRate: [78, 80, 81, 82, 82.1]
  }
};

export const mockReports = [
  {
    id: 'R001',
    title: '焊接质量检测模型V2.1.0验证报告',
    type: '验证报告',
    model: 'M001',
    status: '已归档',
    createdAt: '2026-03-15',
    creator: '测试组'
  },
  {
    id: 'R002',
    title: '装配路径规划模型V3.0.1评审报告',
    type: '评审报告',
    model: 'M003',
    status: '待审核',
    createdAt: '2026-04-28',
    creator: '工艺专家'
  },
  {
    id: 'R003',
    title: '2026年Q1模型评测汇总报告',
    type: '阶段报告',
    model: 'ALL',
    status: '已归档',
    createdAt: '2026-04-01',
    creator: '系统'
  }
];

export const mockUsers = [
  { id: 'U001', name: '张三', role: '算法工程师', department: 'AI研发部' },
  { id: 'U002', name: '李四', role: '工艺专家', department: '工艺工程部' },
  { id: 'U003', name: '王五', role: '测试人员', department: '质量保证部' },
  { id: 'U004', name: '管理员', role: '平台管理员', department: 'IT运维部' }
];
