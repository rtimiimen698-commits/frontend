const API_BASE = '/api'

export const api = {
  // Ateliers
  async getWorkshops(filters = {}) {
    const params = new URLSearchParams()
    if (filters.category && filters.category !== 'Toutes') params.append('category', filters.category)
    if (filters.level && filters.level !== 'Tous') params.append('level', filters.level)
    if (filters.status && filters.status !== 'Tous') params.append('status', filters.status)
    if (filters.search) params.append('search', filters.search)

    const url = `${API_BASE}/workshops${params.toString() ? `?${params.toString()}` : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Impossible de charger les ateliers')
    return res.json()
  },

  async getWorkshop(id) {
    const res = await fetch(`${API_BASE}/workshops/${id}`)
    if (!res.ok) throw new Error('Atelier non trouvé')
    return res.json()
  },

  async createWorkshop(data) {
    const res = await fetch(`${API_BASE}/workshops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Erreur lors de la création')
    }
    return res.json()
  },

  async updateWorkshop(id, data) {
    const res = await fetch(`${API_BASE}/workshops/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Erreur lors de la mise à jour')
    }
    return res.json()
  },

  async deleteWorkshop(id) {
    const res = await fetch(`${API_BASE}/workshops/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Erreur lors de la suppression')
    return res.json()
  },

  async getStats() {
    const res = await fetch(`${API_BASE}/workshops/stats/summary`)
    if (!res.ok) throw new Error('Erreur stats')
    return res.json()
  },

  // Participants
  async getParticipants(workshopId = null) {
    const url = workshopId ? `${API_BASE}/participants?workshopId=${workshopId}` : `${API_BASE}/participants`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Impossible de charger les participants')
    return res.json()
  },

  async registerParticipant(data) {
    const res = await fetch(`${API_BASE}/participants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Erreur lors de l\'inscription')
    }
    return res.json()
  },

  async cancelParticipant(id) {
    const res = await fetch(`${API_BASE}/participants/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Erreur lors de l\'annulation')
    return res.json()
  }
}
