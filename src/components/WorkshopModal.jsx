import React, { useState, useEffect } from 'react'

export default function WorkshopModal({ isOpen, onClose, onSave, editingWorkshop }) {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    category: 'Communication',
    level: 'Intermédiaire',
    format: 'Présentiel',
    location: 'Salle B2 - Soft Skills',
    date: '',
    time: '14:00',
    duration: 3,
    maxParticipants: 15,
    description: ''
  })

  useEffect(() => {
    if (editingWorkshop) {
      setFormData({
        title: editingWorkshop.title || '',
        instructor: editingWorkshop.instructor || '',
        category: editingWorkshop.category || 'Communication',
        level: editingWorkshop.level || 'Intermédiaire',
        format: editingWorkshop.format || 'Présentiel',
        location: editingWorkshop.location || '',
        date: editingWorkshop.date || '',
        time: editingWorkshop.time || '14:00',
        duration: editingWorkshop.duration || 3,
        maxParticipants: editingWorkshop.maxParticipants || 15,
        description: editingWorkshop.description || ''
      })
    } else {
      setFormData({
        title: '',
        instructor: '',
        category: 'Communication',
        level: 'Intermédiaire',
        format: 'Présentiel',
        location: 'Salle B2 - Soft Skills',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        duration: 3,
        maxParticipants: 15,
        description: ''
      })
    }
  }, [editingWorkshop, isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.instructor || !formData.date) {
      alert('Veuillez renseigner le titre, le formateur et la date.')
      return
    }
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {editingWorkshop ? 'Modifier l\'atelier' : 'Ajouter un nouvel atelier'}
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Titre de l'atelier *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="Ex: Techniques de Pitch & Storytelling"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Formateur / Coach *</label>
              <input
                type="text"
                name="instructor"
                className="form-input"
                placeholder="Ex: Amina Trabelsi"
                value={formData.instructor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Catégorie</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Communication">Communication</option>
                <option value="Leadership">Leadership</option>
                <option value="Gestion du Temps">Gestion du Temps</option>
                <option value="Négociation & Pitch">Négociation & Pitch</option>
                <option value="Intelligence Émotionnelle">Intelligence Émotionnelle</option>
                <option value="Travail en Équipe">Travail en Équipe</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Niveau</label>
              <select
                name="level"
                className="form-select"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Format</label>
              <select
                name="format"
                className="form-select"
                value={formData.format}
                onChange={handleChange}
              >
                <option value="Présentiel">Présentiel</option>
                <option value="En ligne">En ligne</option>
                <option value="Hybride">Hybride</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date *</label>
              <input
                type="date"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Heure</label>
              <input
                type="time"
                name="time"
                className="form-input"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Durée (heures)</label>
              <input
                type="number"
                name="duration"
                className="form-input"
                min="1"
                max="8"
                step="0.5"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Capacité maximale</label>
              <input
                type="number"
                name="maxParticipants"
                className="form-input"
                min="1"
                max="100"
                value={formData.maxParticipants}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Lieu ou Lien de connexion</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="Ex: Salle A1 ou Lien Google Meet"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Objectifs & Description</label>
            <textarea
              name="description"
              className="form-textarea"
              rows="3"
              placeholder="Décrivez les compétences développées lors de cet atelier..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {editingWorkshop ? 'Enregistrer les modifications' : 'Créer l\'atelier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
