import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import WorkshopModal from './components/WorkshopModal'
import ParticipantModal from './components/ParticipantModal'
import Dashboard from './pages/Dashboard'
import WorkshopsPage from './pages/WorkshopsPage'
import ParticipantsPage from './pages/ParticipantsPage'
import AboutPage from './pages/AboutPage'
import { api } from './services/api'
import './App.css'

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [workshops, setWorkshops] = useState([])
  const [participants, setParticipants] = useState([])
  const [stats, setStats] = useState({
    totalWorkshops: 0,
    totalRegistered: 0,
    occupancyRate: 0,
    categoriesCount: {}
  })
  const [loading, setLoading] = useState(true)
  const [toasts, setToasts] = useState([])

  // États des modales
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false)
  const [editingWorkshop, setEditingWorkshop] = useState(null)
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false)
  const [selectedWorkshopForRegister, setSelectedWorkshopForRegister] = useState(null)

  // Notification Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }

  // Chargement des données initiales
  const loadData = async () => {
    try {
      setLoading(true)
      const [workshopsData, statsData, participantsData] = await Promise.all([
        api.getWorkshops(),
        api.getStats(),
        api.getParticipants()
      ])
      setWorkshops(workshopsData)
      setStats(statsData)
      setParticipants(participantsData)
    } catch (err) {
      console.error(err)
      showToast('Connexion à l\'API en cours d\'initialisation...', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Actions Ateliers
  const handleOpenNewWorkshop = () => {
    setEditingWorkshop(null)
    setIsWorkshopModalOpen(true)
  }

  const handleEditWorkshop = (workshop) => {
    setEditingWorkshop(workshop)
    setIsWorkshopModalOpen(true)
  }

  const handleSaveWorkshop = async (formData) => {
    try {
      if (editingWorkshop) {
        const updated = await api.updateWorkshop(editingWorkshop._id, formData)
        setWorkshops(prev => prev.map(w => (w._id === editingWorkshop._id ? updated : w)))
        showToast('Atelier mis à jour avec succès !')
      } else {
        const created = await api.createWorkshop(formData)
        setWorkshops(prev => [created, ...prev])
        showToast('Nouvel atelier ajouté au catalogue !')
      }
      setIsWorkshopModalOpen(false)
      // Mettre à jour les stats
      const newStats = await api.getStats()
      setStats(newStats)
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const handleDeleteWorkshop = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) return

    try {
      await api.deleteWorkshop(id)
      setWorkshops(prev => prev.filter(w => w._id !== id))
      showToast('Atelier supprimé.')
      const newStats = await api.getStats()
      setStats(newStats)
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  // Actions Inscriptions
  const handleOpenRegister = (workshop) => {
    setSelectedWorkshopForRegister(workshop)
    setIsParticipantModalOpen(true)
  }

  const handleRegisterParticipant = async (data) => {
    try {
      const newPart = await api.registerParticipant(data)
      setParticipants(prev => [newPart, ...prev])
      showToast(`Inscription confirmée pour ${data.fullName} !`)
      setIsParticipantModalOpen(false)
      // Recharger ateliers et stats pour voir les compteurs de places mis à jour
      const [updatedWorkshops, updatedStats] = await Promise.all([
        api.getWorkshops(),
        api.getStats()
      ])
      setWorkshops(updatedWorkshops)
      setStats(updatedStats)
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const handleCancelParticipant = async (id) => {
    if (!window.confirm('Confirmer l\'annulation de cette inscription ?')) return

    try {
      await api.cancelParticipant(id)
      setParticipants(prev => prev.filter(p => p._id !== id))
      showToast('Inscription annulée.')
      // Recharger pour synchroniser le compteur
      const [updatedWorkshops, updatedStats] = await Promise.all([
        api.getWorkshops(),
        api.getStats()
      ])
      setWorkshops(updatedWorkshops)
      setStats(updatedStats)
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <div className="app-container">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenNewWorkshop={handleOpenNewWorkshop}
      />

      <main className="main-content">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Chargement de l'application...</p>
          </div>
        ) : (
          <>
            {currentView === 'dashboard' && (
              <Dashboard
                stats={stats}
                workshops={workshops}
                onNavigateWorkshops={() => setCurrentView('workshops')}
                onOpenNewWorkshop={handleOpenNewWorkshop}
                onEditWorkshop={handleEditWorkshop}
                onDeleteWorkshop={handleDeleteWorkshop}
                onRegisterWorkshop={handleOpenRegister}
              />
            )}

            {currentView === 'workshops' && (
              <WorkshopsPage
                workshops={workshops}
                onOpenNewWorkshop={handleOpenNewWorkshop}
                onEditWorkshop={handleEditWorkshop}
                onDeleteWorkshop={handleDeleteWorkshop}
                onRegisterWorkshop={handleOpenRegister}
              />
            )}

            {currentView === 'participants' && (
              <ParticipantsPage
                participants={participants}
                workshops={workshops}
                onCancelParticipant={handleCancelParticipant}
              />
            )}

            {currentView === 'about' && <AboutPage />}
          </>
        )}
      </main>

      <Footer />

      {/* Modales */}
      <WorkshopModal
        isOpen={isWorkshopModalOpen}
        onClose={() => setIsWorkshopModalOpen(false)}
        onSave={handleSaveWorkshop}
        editingWorkshop={editingWorkshop}
      />

      <ParticipantModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
        onRegister={handleRegisterParticipant}
        workshop={selectedWorkshopForRegister}
      />

      {/* Notifications */}
      <Toast toasts={toasts} />
    </div>
  )
}
