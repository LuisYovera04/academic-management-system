import React, { useEffect, useState } from 'react';
import api from '../services/api_service';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getStatistics()
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="students-container"><h3>Analyzing academic data...</h3></div>;
  if (error) return <div className="students-container"><h3 style={{color: 'red'}}>{error}</h3></div>;

  return (
    <div className="students-container">
      <header className="dashboard-header">
        <h1 className="section-title">Academic Insights Dashboard</h1>
        <p className="subtitle">Real-time overview of institutional performance.</p>
      </header>

      {/* Primary Metrics Grid */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">{stats.total_students}</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3>Average GPA</h3>
            <p className="stat-number">{stats.average_gpa?.toFixed(2) || '0.00'}</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Active Majors</h3>
            <p className="stat-number">{Object.keys(stats.distribution_by_major || {}).length}</p>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="detail-grid" style={{ marginTop: '30px' }}>
        <section className="student-card-detail">
          <h4>Distribution by Major</h4>
          <div className="chart-list">
            {Object.entries(stats.distribution_by_major || {}).map(([major, count]) => (
              <div key={major} className="chart-row">
                <span className="label">{major}</span>
                <div className="bar-container">
                  <div className="bar" style={{ width: `${(count / stats.total_students) * 100}%` }}></div>
                </div>
                <span className="count">{count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="student-card-detail actions-panel">
          <h4>Administrative Actions</h4>
          <div className="action-buttons">
            <a href="/students/new" className="btn-add">Register Student</a>
            <a href="/students" className="btn-view">Database Management</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;