import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useStore } from '../store';

// 页面组件
import Login from '../pages/Login';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Models from '../pages/Models';
import Metrics from '../pages/Metrics';
import Scenes from '../pages/Scenes';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

// 路由守卫组件
function ProtectedRoute({ children }) {
  const isLoggedIn = useStore(state => state.isLoggedIn);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// 登录页守卫（已登录则跳转到首页）
function PublicRoute({ children }) {
  const isLoggedIn = useStore(state => state.isLoggedIn);
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

// 路由配置
const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'models',
        element: <Models />
      },
      {
        path: 'metrics',
        element: <Metrics />
      },
      {
        path: 'scenes',
        element: <Scenes />
      },
      {
        path: 'reports',
        element: <Reports />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]);

export { router };

export default function Router() {
  return <RouterProvider router={router} />;
}
