import { createContext, useContext, useState, useCallback } from 'react'

export const defaultResume = {
  title: 'My Resume',
  lang:  'en',   // persisted with the resume so PDF matches the editing language
  personalInfo: {
    name: '', email: '', phone: '',
    location: '', website: '', linkedin: '', summary: '',
  },
  education:  [],
  experience: [],
  skills:     [],
  projects:   [],
  template:   'classic',
}

const ResumeContext = createContext(null)

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(defaultResume)
  const [saved,  setSaved]  = useState(true)

  const updatePersonalInfo = useCallback((field, value) => {
    setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }))
    setSaved(false)
  }, [])

  const updateField = useCallback((field, value) => {
    setResume(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }, [])

  // Education
  const addEducation = useCallback(() => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, {
        _id: Date.now().toString(),
        institution: '', degree: '', field: '',
        startDate: '', endDate: '', gpa: '',
      }],
    }))
    setSaved(false)
  }, [])

  const updateEducation = useCallback((index, field, value) => {
    setResume(prev => {
      const arr = [...prev.education]
      arr[index] = { ...arr[index], [field]: value }
      return { ...prev, education: arr }
    })
    setSaved(false)
  }, [])

  const removeEducation = useCallback((index) => {
    setResume(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }))
    setSaved(false)
  }, [])

  // Experience
  const addExperience = useCallback(() => {
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, {
        _id: Date.now().toString(),
        company: '', role: '', location: '',
        startDate: '', endDate: '', current: false, bullets: [''],
      }],
    }))
    setSaved(false)
  }, [])

  const updateExperience = useCallback((index, field, value) => {
    setResume(prev => {
      const arr = [...prev.experience]
      arr[index] = { ...arr[index], [field]: value }
      return { ...prev, experience: arr }
    })
    setSaved(false)
  }, [])

  const removeExperience = useCallback((index) => {
    setResume(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }))
    setSaved(false)
  }, [])

  const updateBullet = useCallback((expIndex, bulletIndex, value) => {
    setResume(prev => {
      const arr = [...prev.experience]
      const bullets = [...(arr[expIndex].bullets || [])]
      bullets[bulletIndex] = value
      arr[expIndex] = { ...arr[expIndex], bullets }
      return { ...prev, experience: arr }
    })
    setSaved(false)
  }, [])

  const addBullet = useCallback((expIndex) => {
    setResume(prev => {
      const arr = [...prev.experience]
      arr[expIndex] = { ...arr[expIndex], bullets: [...(arr[expIndex].bullets || []), ''] }
      return { ...prev, experience: arr }
    })
    setSaved(false)
  }, [])

  const removeBullet = useCallback((expIndex, bulletIndex) => {
    setResume(prev => {
      const arr = [...prev.experience]
      arr[expIndex] = { ...arr[expIndex], bullets: arr[expIndex].bullets.filter((_, i) => i !== bulletIndex) }
      return { ...prev, experience: arr }
    })
    setSaved(false)
  }, [])

  // Skills
  const addSkill = useCallback((skill) => {
    if (!skill.trim()) return
    setResume(prev => ({ ...prev, skills: [...prev.skills, skill.trim()] }))
    setSaved(false)
  }, [])

  const removeSkill = useCallback((index) => {
    setResume(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
    setSaved(false)
  }, [])

  // Projects
  const addProject = useCallback(() => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, {
        _id: Date.now().toString(),
        name: '', description: '', technologies: '', link: '',
      }],
    }))
    setSaved(false)
  }, [])

  const updateProject = useCallback((index, field, value) => {
    setResume(prev => {
      const arr = [...prev.projects]
      arr[index] = { ...arr[index], [field]: value }
      return { ...prev, projects: arr }
    })
    setSaved(false)
  }, [])

  const removeProject = useCallback((index) => {
    setResume(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }))
    setSaved(false)
  }, [])

  return (
    <ResumeContext.Provider value={{
      resume, setResume, saved, setSaved,
      updatePersonalInfo, updateField,
      addEducation, updateEducation, removeEducation,
      addExperience, updateExperience, removeExperience,
      updateBullet, addBullet, removeBullet,
      addSkill, removeSkill,
      addProject, updateProject, removeProject,
    }}>
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider')
  return ctx
}
