import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 根据模式加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    // 环境变量前缀
    envPrefix: 'VITE_',
    // 开发服务器配置
    server: {
      port: Number(env.VITE_PORT) || 3000,
      proxy: {
        // API 代理配置示例
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true
        }
      }
    },
    // 构建配置
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production'
    },
    // 定义全局变量
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0')
    }
  }
})
