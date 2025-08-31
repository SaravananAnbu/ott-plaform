import { ConfigProvider } from 'antd';
import { Dashboard } from './pages';
import 'antd/dist/reset.css';
import './App.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#00b96b',
          borderRadius: 2,
        },
      }}
    >
      <Dashboard />
    </ConfigProvider>
  );
}

export default App
