import React from 'react'

export default function WorkshopCard({ workshop, onEdit, onDelete, onRegister }) {
  const getCategoryClass = (category) => {
    switch (category) {
      case 'Communication': return 'badge-cat-communication'
      case 'Leadership': return 'badge-cat-leadership'
      case 'Gestion du Temps': return 'badge-cat-gestion-du-temps'
      case 'Négociation & Pitch': return 'badge-cat-negociation-pitch'
      case 'Intelligence Émotionnelle': return 'badge-cat-intelligence-emotionnelle'
      default: return 'badge-cat-travail-en-equipe'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Complet': return 'badge-status-complet'
      case 'Terminé': return 'badge-status-termine'
      default: return 'badge-status-planifie'
    }
  }

  const percentFull = Math.min(100, Math.round(((workshop.registeredCount || 0) / (workshop.maxParticipants || 1)) * 100))
  const isFull = (workshop.registeredCount || 0) >= (workshop.maxParticipants || 1)

  return (
    <div className="workshop-card">
      <div>
        <div className="card-top">
          <span className={`badge ${getCategoryClass(workshop.category)}`}>
            {workshop.category}
          </span>
          <span className={`badge ${getStatusClass(workshop.status)}`}>
            {workshop.status}
          </span>
        </div>

        <h3 className="workshop-title">{workshop.title}</h3>

        <div className="workshop-instructor">
          <div className="instructor-avatar">
            {workshop.instructor ? workshop.instructor.charAt(0).toUpperCase() : 'C'}
          </div>
          <span>Coach : <strong>{workshop.instructor}</strong></span>
        </div>

        <p className="workshop-desc">{workshop.description || 'Session pratique d\'immersion et de développement des compétences interpersonnelles.'}</p>

        <div className="workshop-meta">
          <div className="meta-item">
            <span>📅</span>
            <span>{workshop.date}</span>
          </div>
          <div className="meta-item">
            <span>⏰</span>
            <span>{workshop.time} ({workshop.duration}h)</span>
          </div>
          <div className="meta-item">
            <span>📍</span>
            <span>{workshop.format}</span>
          </div>
          <div className="meta-item">
            <span>🎓</span>
            <span>{workshop.level}</span>
          </div>
        </div>

        <div className="progress-wrap">
          <div className="progress-labels">
            <span>Places réservées</span>
            <strong>{workshop.registeredCount || 0} / {workshop.maxParticipants} ({percentFull}%)</strong>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${percentFull}%`,
                backgroundColor: isFull ? '#EF4444' : percentFull > 75 ? '#F59E0B' : '#4F46E5'
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button
          className={`btn btn-sm ${isFull ? 'btn-secondary' : 'btn-primary'}`}
          style={{ flex: 1 }}
          onClick={() => onRegister(workshop)}
          disabled={isFull}
        >
          {isFull ? 'Atelier Complet' : 'Inscrire un participant'}
        </button>

        <button
          className="btn btn-outline btn-sm"
          title="Modifier l'atelier"
          onClick={() => onEdit(workshop)}
        >
          ✏️
        </button>

        <button
          className="btn btn-danger-outline btn-sm"
          title="Supprimer l'atelier"
          onClick={() => onDelete(workshop._id)}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}
