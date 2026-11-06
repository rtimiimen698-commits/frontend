import React, { useState } from 'react'

export default function ParticipantsPage({
  participants,
  workshops,
  onCancelParticipant
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWorkshop, setSelectedWorkshop] = useState('Tous')

  const filtered = participants.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesWorkshop =
      selectedWorkshop === 'Tous' ||
      p.workshop === selectedWorkshop ||
      p.workshopTitle === selectedWorkshop

    return matchesSearch && matchesWorkshop
  })

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Registre des Inscriptions</h1>
            <p className="page-subtitle">Consultez et gérez la liste des apprenants inscrits aux différentes sessions.</p>
          </div>
          <div className="badge badge-cat-communication" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
            Total Inscriptions : <strong>{participants.length}</strong>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <span className="search-icon-pos">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par nom d'apprenant ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="select-filter"
          value={selectedWorkshop}
          onChange={(e) => setSelectedWorkshop(e.target.value)}
          style={{ maxWidth: '300px' }}
        >
          <option value="Tous">Tous les ateliers</option>
          {workshops.map(w => (
            <option key={w._id} value={w._id}>
              {w.title}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>👥</span>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontWeight: 600 }}>
              Aucune inscription trouvée.
            </p>
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Apprenant</th>
                <th>Contact</th>
                <th>Atelier associé</th>
                <th>Statut</th>
                <th>Remarques</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id}>
                  <td>
                    <strong>{p.fullName}</strong>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>{p.email}</div>
                    {p.phone && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {p.phone}
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                      {p.workshopTitle || 'Atelier'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-cat-gestion-du-temps">
                      {p.status || 'Confirmé'}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {p.notes || '—'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-danger-outline btn-sm"
                      onClick={() => onCancelParticipant(p._id)}
                      title="Annuler l'inscription"
                    >
                      Annuler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
