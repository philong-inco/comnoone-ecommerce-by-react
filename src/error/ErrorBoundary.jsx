import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import logocomno1 from 'assets/images/logocomno1.png';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, isLoading: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  componentDidUpdate() {
    if (this.state.hasError && !this.state.isLoading) {
      this.setState({ isLoading: true });
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <div >
         <img src={logocomno1} alt="Berry" width="170" />
        </div>
        <div style={{ padding: '0 30%' }}>
        <LinearProgress color="secondary" />
        </div>
      </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;