// Re-export the shared axios instance that already handles auth token injection
// and silent refresh. All other services import from here.
export { api as default } from '../context/AuthContext'
import { api } from '../context/AuthContext'

// Resumes
export const getAllResumes  = ()         => api.get('/resumes')
export const getResume      = (id)       => api.get(`/resumes/${id}`)
export const createResume   = (data)     => api.post('/resumes', data)
export const updateResume   = (id, data) => api.put(`/resumes/${id}`, data)
export const deleteResume   = (id)       => api.delete(`/resumes/${id}`)
export const downloadPdf    = (id)       => api.get(`/resumes/${id}/pdf`, { responseType: 'arraybuffer' })

// AI
export const getAiSuggestions = (jobRole, context = '') =>
  api.post('/ai/suggestions', { jobRole, context })

export const improveAiSummary = (summary, jobRole = '') =>
  api.post('/ai/improve', { summary, jobRole })
