import React from 'react'
import StatsOverview from '../components/StatsOverview'
import WorkshopCard from '../components/WorkshopCard'

export default function Dashboard({
  stats,
  workshops,
  onNavigateWorkshops,
  onOpenNewWorkshop,
  onEditWorkshop,
  onDeleteWorkshop,
  onRegisterWorkshop
}) {
  const upcomingWorkshops = workshops.slice(0, 3)

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Tableau de Bord des Formations</h1>
            <p className="page-subtitle">Suivi en temps réel des ateliers de développement personnel et soft skills.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-outline" onClick={onNavigateWorkshops}>
              Voir le catalogue complet
            </button>
            <button className="btn btn-primary" onClick={onOpenNewWorkshop}>
              + Planifier un atelier
            </button>
          </div>
        </div>
      </div>

      <StatsOverview stats={stats} />

      <div style={{ marginTop: '2.5rem' }}>
        <div className="page-header-row" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Sessions Prochainement Disponibles</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Les ateliers prioritaires de la semaine.</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onNavigateWorkshops}>
            Tous les ateliers ({workshops.length}) →
          </button>
        </div>

        {upcomingWorkshops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Aucun atelier enregistré pour le moment.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={onOpenNewWorkshop}>
              Créer le premier atelier
            </button>
          </div>
        ) : (
          <div className="workshops-grid">
            {upcomingWorkshops.map(workshop => (
              <WorkshopCard
                key={workshop._id}
                workshop={workshop}
                onEdit={onEditWorkshop}
                onDelete={onDeleteWorkshop}
                onRegister={onRegisterWorkshop}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
