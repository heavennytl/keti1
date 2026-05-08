import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Router from './router/index.jsx';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  );
}

export default App;
