# 垂域模型评估系统 - 前端

> 面向动态场景适配的垂域模型多元评估与虚拟验证系统

## 📋 项目简介

这是一个基于 React 19 + Vite 的前端演示项目，用于展示垂域模型（垂直领域AI模型）的评估与管理功能。

### 主要功能

- 🔐 **登录认证** - 基于角色的登录系统
- 📊 **数据看板** - 模型统计、趋势图表
- 🤖 **模型管理** - 模型注册、筛选、详情查看
- 📈 **评测指标** - 多维度指标体系与权重配置
- 🎯 **场景孪生** - 数字孪生可视化与仿真
- 📄 **报告中心** - 验证报告管理
- ⚙️ **系统设置** - 角色、字典、通知配置

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19.2.5 | UI 框架 |
| Vite | 8.0.10 | 构建工具 |
| Zustand | 5.0.13 | 状态管理 |
| Ant Design | 6.3.7 | UI 组件库 |
| React Router | 7.15.0 | 路由管理 |
| ECharts | 6.0.0 | 图表可视化 |

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
cd frontend
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000，使用默认账号登录：
- 用户名：admin
- 密码：123456

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
frontend/
├── public/              # 静态资源
├── src/
│   ├── assets/          # 图片等资源
│   ├── components/      # 公共组件
│   │   ├── Header.jsx   # 页头组件
│   │   ├── Layout.jsx   # 布局组件
│   │   └── Sider.jsx    # 侧边栏组件
│   ├── mock/            # Mock 数据
│   │   └── data.js      # 模拟数据
│   ├── pages/           # 页面组件
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Metrics.jsx
│   │   ├── Models.jsx
│   │   ├── Reports.jsx
│   │   ├── Scenes.jsx
│   │   └── Settings.jsx
│   ├── router/          # 路由配置
│   │   └── index.jsx
│   ├── store/           # 状态管理
│   │   └── index.js
│   ├── App.jsx          # 根组件
│   ├── main.jsx         # 入口文件
│   └── index.css        # 全局样式
├── .env.development     # 开发环境变量
├── .env.production      # 生产环境变量
├── .env.example         # 环境变量示例
├── vite.config.js       # Vite 配置
├── eslint.config.js     # ESLint 配置
└── package.json
```

## 🔧 环境变量配置

参考 `.env.example` 创建对应的环境变量文件：

```bash
cp .env.example .env.development
```

常用配置项：
- `VITE_PORT` - 开发服务器端口
- `VITE_API_BASE_URL` - API 地址
- `VITE_ENABLE_MOCK` - 是否启用 Mock 数据

## 📝 代码规范

- 使用 ESLint 进行代码检查
- 组件使用 `PascalCase` 命名
- hooks 使用 `camelCase` 命名，以 `use` 开头
- 样式统一使用 Ant Design Token

## 🎨 页面预览

### 登录页
- 渐变背景、卡片式登录表单
- 支持选择角色（算法工程师、工艺专家等）

### 数据看板
- 统计卡片、趋势图表、饼图
- 模型状态分布、近期报告列表

### 模型管理
- 表格列表、筛选功能
- 模型详情抽屉、新增弹窗

### 场景孪生
- Canvas 数字孪生可视化
- 仿真控制、扰动注入配置

## 📄 License

MIT License