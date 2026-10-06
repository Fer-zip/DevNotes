import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#2d0000', color: '#ffaaaa', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2>💥 ¡Algo salió mal en React!</h2>
          <p>La aplicación falló al renderizar. Aquí está el error:</p>
          <pre style={{ background: '#000', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '0.5rem 1rem', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}
          >
            Recargar Página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
