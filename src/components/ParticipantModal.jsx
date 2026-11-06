import React, { useState } from 'react'

export default function ParticipantModal({ isOpen, onClose, onRegister, workshop }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  })

  if (!isOpen || !workshop) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email) {
      alert('Veuillez renseigner le nom et l\'adresse email.')
      return
    }

    onRegister({
      ...formData,
      workshopId: workshop._id,
      workshopTitle: workshop.title
    })

    setFormData({ fullName: '', email: '', phone: '', notes: '' })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Inscription à l'atelier</h2>
            <p style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, marginTop: '0.25rem' }}>
              {workshop.title}
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nom et Prénom *</label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="Ex: Yassine Mansour"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Adresse Email *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Ex: yassine@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="Ex: +216 98 123 456"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Objectif personnel ou question pour le formateur</label>
            <textarea
              name="notes"
              className="form-textarea"
              rows="2"
              placeholder="Ex: Améliorer mon aisance lors des soutenances..."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Valider l'inscription
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
