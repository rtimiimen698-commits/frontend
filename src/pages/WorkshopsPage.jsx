import React, { useState } from 'react'
import WorkshopCard from '../components/WorkshopCard'

const CATEGORIES = [
  'Toutes',
  'Communication',
  'Leadership',
  'Gestion du Temps',
  'Négociation & Pitch',
  'Intelligence Émotionnelle',
  'Travail en Équipe'
]

export default function WorkshopsPage({
  workshops,
  onOpenNewWorkshop,
  onEditWorkshop,
  onDeleteWorkshop,
  onRegisterWorkshop
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [selectedLevel, setSelectedLevel] = useState('Tous')
  const [selectedFormat, setSelectedFormat] = useState('Tous')

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch =
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'Toutes' || workshop.category === selectedCategory
    const matchesLevel = selectedLevel === 'Tous' || workshop.level === selectedLevel
    const matchesFormat = selectedFormat === 'Tous' || workshop.format === selectedFormat

    return matchesSearch && matchesCategory && matchesLevel && matchesFormat
  })

  return (
    <div>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Gestion des Ateliers & Soft Skills</h1>
            <p className="page-subtitle">Parcourez, filtrez et gérez les programmes de formation interactifs.</p>
          </div>
          <button className="btn btn-primary" onClick={onOpenNewWorkshop}>
            + Nouvel Atelier
          </button>
        </div>
      </div>

      {/* Barre de Recherche et Sélecteurs */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <span className="search-icon-pos">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par titre ou formateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="select-filter"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="Tous">Tous les niveaux</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </select>

        <select
          className="select-filter"
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
        >
          <option value="Tous">Tous les formats</option>
          <option value="Présentiel">Présentiel</option>
          <option value="En ligne">En ligne</option>
          <option value="Hybride">Hybride</option>
        </select>
      </div>

      {/* Badges de Catégories */}
      <div className="category-pills">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grille des Ateliers */}
      {filteredWorkshops.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: '2.5rem' }}>🔍</span>
          <h3 style={{ marginTop: '1rem', fontWeight: 700 }}>Aucun atelier ne correspond à votre recherche</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Essayez de modifier vos filtres ou de réinitialiser la recherche.
          </p>
          <button
            className="btn btn-outline btn-sm"
            style={{ marginTop: '1.25rem' }}
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('Toutes')
              setSelectedLevel('Tous')
              setSelectedFormat('Tous')
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="workshops-grid">
          {filteredWorkshops.map(workshop => (
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
  )
}
