import React from 'react'

export default function StatsOverview({ stats }) {
  const {
    totalWorkshops = 0,
    totalRegistered = 0,
    occupancyRate = 0,
    categoriesCount = {}
  } = stats || {}

  const activeCategoriesCount = Object.keys(categoriesCount).length

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#EEF2FF', color: '#4F46E5' }}>
          🎯
        </div>
        <div className="stat-info">
          <h3>{totalWorkshops}</h3>
          <p>Ateliers Planifiés</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#ECFDF5', color: '#10B981' }}>
          👥
        </div>
        <div className="stat-info">
          <h3>{totalRegistered}</h3>
          <p>Participants Inscrits</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#FFFBEB', color: '#F59E0B' }}>
          📈
        </div>
        <div className="stat-info">
          <h3>{occupancyRate}%</h3>
          <p>Taux de Remplissage</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: '#FAF5FF', color: '#A855F7' }}>
          💡
        </div>
        <div className="stat-info">
          <h3>{activeCategoriesCount}</h3>
          <p>Compétences Clés</p>
        </div>
      </div>
    </div>
  )
}
