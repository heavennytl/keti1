function App_simple() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: 24,
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>🎉 垂域模型评估系统</h1>
        <p style={{ fontSize: 18 }}>App 正在运行中！</p>
      </div>
    </div>
  );
}

export default App_simple;