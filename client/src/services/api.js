<<<<<<< HEAD
export { api as default } from '../context/AuthContext'
import { api } from '../context/AuthContext'
=======
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
})
>>>>>>> 1b585c7 (Ready, Set, Go!)

// Resumes
export const getAllResumes  = ()         => api.get('/resumes')
export const getResume      = (id)       => api.get(`/resumes/${id}`)
export const createResume   = (data)     => api.post('/resumes', data)
export const updateResume   = (id, data) => api.put(`/resumes/${id}`, data)
export const deleteResume   = (id)       => api.delete(`/resumes/${id}`)
<<<<<<< HEAD
export const downloadPdf    = (id)       => api.get(`/resumes/${id}/pdf`, { responseType: 'arraybuffer' })
=======
export const downloadPdf    = (id)       => api.get(`/resumes/${id}/pdf`, { responseType: 'blob' })
>>>>>>> 1b585c7 (Ready, Set, Go!)

// AI
export const getAiSuggestions = (jobRole, context = '') =>
  api.post('/ai/suggestions', { jobRole, context })

export const improveAiSummary = (summary, jobRole = '') =>
  api.post('/ai/improve', { summary, jobRole })
<<<<<<< HEAD
=======

export default api
>>>>>>> 1b585c7 (Ready, Set, Go!)
