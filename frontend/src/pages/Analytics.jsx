import { useState, useEffect } from 'react';

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analytics/dashboard');
        if (!response.ok) throw new Error('Failed to fetch analytics');
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const clearAllData = async () => {
    if (!window.confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      return;
    }

    setClearing(true);
    try {
      const response = await fetch('http://localhost:5000/api/analytics/clear', {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to clear data');
      
      // Refresh the data
      const dashboardResponse = await fetch('http://localhost:5000/api/analytics/dashboard');
      const data = await dashboardResponse.json();
      setAnalyticsData(data);
      
      alert('All analytics data cleared successfully!');
    } catch (err) {
      setError(err.message);
      alert('Failed to clear analytics data');
    } finally {
      setClearing(false);
    }
  };

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;
  if (error) return <div className="analytics-error">Error: {error}</div>;
  if (!analyticsData) return <div className="analytics-error">No data available</div>;

  return (
    <div className="analytics-dashboard">
      <h1 className="analytics-title">Visitor Counter</h1>
      
      {/* Main Counter */}
      <div className="analytics-overview">
        <div className="stat-card main-counter">
          <h3>👥 Total Unique Visitors</h3>
          <p className="stat-number">{analyticsData.totalVisitors}</p>
          <p className="stat-description">Each person who visits the website</p>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="analytics-section">
        <h2>👤 Recent Visitors</h2>
        <div className="recent-visitors">
          {analyticsData.recentVisitors.map((visitor, index) => (
            <div key={index} className="visitor-item">
              <span className="visitor-number">{index + 1}.</span>
              <span className="visitor-time">
                {new Date(visitor.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="analytics-actions">
        <button 
          className="refresh-btn"
          onClick={() => window.location.reload()}
        >
          🔄 Refresh Data
        </button>
        
        <button 
          className="clear-btn"
          onClick={clearAllData}
          disabled={clearing}
        >
          {clearing ? '⏳ Clearing...' : '🗑️ Clear All Data'}
        </button>
      </div>
    </div>
  );
}
