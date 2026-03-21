import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
})

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

export default api
