import { create } from 'zustand';
import { mockModels, mockScenes, mockMetrics, mockWeights, mockDashboard, mockReports } from '../mock/data';

export const useStore = create((set, get) => ({
  // 用户状态
  user: null,
  isLoggedIn: false,
  
  // 数据状态
  models: mockModels,
  scenes: mockScenes,
  metrics: mockMetrics,
  weights: mockWeights,
  dashboard: mockDashboard,
  reports: mockReports,
  
  // 筛选状态
  filters: {
    modelType: null,
    industry: null,
    process: null,
    status: null
  },
  
  // 动作
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  resetFilters: () => set({ filters: { modelType: null, industry: null, process: null, status: null } }),
  
  // 获取过滤后的模型列表
  getFilteredModels: () => {
    const { models, filters } = get();
    return models.filter(model => {
      if (filters.modelType && model.type !== filters.modelType) return false;
      if (filters.industry && model.industry !== filters.industry) return false;
      if (filters.process && model.process !== filters.process) return false;
      if (filters.status && model.status !== filters.status) return false;
      return true;
    });
  },
  
  // 获取单个模型
  getModelById: (id) => get().models.find(m => m.id === id),
  
  // 获取单个场景
  getSceneById: (id) => get().scenes.find(s => s.id === id),
  
  // 更新权重
  updateWeights: (newWeights) => set({ weights: newWeights }),
  
  // 添加模型
  addModel: (model) => set({ models: [...get().models, { ...model, id: `M${String(get().models.length + 1).padStart(3, '0')}` }] }),
  
  // 更新模型
  updateModel: (id, updates) => set({
    models: get().models.map(m => m.id === id ? { ...m, ...updates } : m)
  })
}));
