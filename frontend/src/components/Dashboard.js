import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [helloData, infoData] = await Promise.all([
          apiService.getHello(),
          apiService.getApiInfo()
        ]);
        setApiData({ hello: helloData, info: infoData });
      } catch (err) {
        setError('Failed to connect to backend. Make sure the Django server is running on port 8000.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const retryConnection = () => {
    setError(null);
    setLoading(true);
    const fetchData = async () => {
      try {
        const [helloData, infoData] = await Promise.all([
          apiService.getHello(),
          apiService.getApiInfo()
        ]);
        setApiData({ hello: helloData, info: infoData });
        setError(null);
      } catch (err) {
        setError('Failed to connect to backend. Make sure the Django server is running on port 8000.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Connecting to backend...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Connection Error</h2>
          <p>{error}</p>
          <button onClick={retryConnection} className="retry-btn">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h2>Welcome to Student Information & Resource Hub</h2>
          <p>Your comprehensive platform for academic resources and information.</p>
        </div>

        <div className="api-status">
          <h3>Backend Connection Status</h3>
          <div className="status-cards">
            <div className="status-card success">
              <div className="status-icon">✅</div>
              <h4>API Connected</h4>
              <p>{apiData?.hello?.message}</p>
            </div>
            
            <div className="status-card info">
              <div className="status-icon">ℹ️</div>
              <h4>API Information</h4>
              <p><strong>Name:</strong> {apiData?.info?.name}</p>
              <p><strong>Version:</strong> {apiData?.info?.version}</p>
              <p><strong>Description:</strong> {apiData?.info?.description}</p>
            </div>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Academic Resources</h3>
            <p>Access study materials, notes, and educational content.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Event Calendar</h3>
            <p>Stay updated with important dates and events.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Student Community</h3>
            <p>Connect with fellow students and share experiences.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your academic progress and achievements.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
