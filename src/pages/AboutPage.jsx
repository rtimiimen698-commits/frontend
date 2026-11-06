import React from 'react'

export default function AboutPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Présentation du Projet Final</h1>
        <p className="page-subtitle">Projet de fin d'études & de formation : Développement Web Fullstack & Soft Skills.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>
            🎯 Objectifs de l'Application
          </h2>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
            <strong>SkillFlow</strong> est une solution web complète dédiée à l'organisation, la promotion et le suivi des ateliers de formation aux compétences comportementales (Soft Skills) pour étudiants et développeurs juniors.
          </p>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Planification et gestion centralisée des sessions de formation (CRUD complet).</li>
            <li>Gestion des jauges de présence et inscriptions des apprenants.</li>
            <li>Recherche instantanée et filtrage dynamique par domaine de compétence.</li>
            <li>Tableau de bord statistique pour évaluer la demande et le taux de remplissage.</li>
          </ul>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>
            ⚙️ Architecture & Technologies
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <strong>Frontend :</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                React.js avec Vite (Single Page Application), gestion d'état déclarative, composants modulaires et responsive design en CSS pur moderne.
              </p>
            </div>
            <div>
              <strong>Backend :</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Node.js & Express.js structurés en architecture MVC (Modèles, Contrôleurs, Routes) avec API REST sécurisée.
              </p>
            </div>
            <div>
              <strong>Base de données :</strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                MongoDB avec Mongoose (schémas typés, validation des données, relations de données Atelier-Participant).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
          💡 Mise en Pratique des Soft Skills
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.35rem' }}>🗣️ Communication & Clarté</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Conception d'une interface intuitive, messages d'erreurs explicites et retour visuel immédiat pour chaque interaction.
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.35rem' }}>⏱️ Gestion du Temps & Priorités</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Découpage du projet en sprints courts, priorisation du MVP fonctionnel avant l'ajout de fonctionnalités secondaires.
            </p>
          </div>
          <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.35rem' }}>🧩 Résolution de Problèmes</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Mise en place d'un système robuste avec tolérance de panne garantissant le fonctionnement continu de l'application.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
