import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { improveAiSummary } from '../../services/api'

export default function PersonalInfo() {
  const { resume, updatePersonalInfo } = useResume()
  const p = resume.personalInfo

  const [improving, setImproving] = useState(false)

  const field = (label, key, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={p[key] || ''}
        onChange={e => updatePersonalInfo(key, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )

  const handleImprove = async () => {
    if (!p.summary) return
    setImproving(true)
    try {
      const { data } = await improveAiSummary(p.summary, '')
      updatePersonalInfo('summary', data.improved)
    } catch (e) {
      alert('AI improve failed. Check your GEMINI_API_KEY.')
    } finally {
      setImproving(false)
    }
  }

  return (
    <div>
      <div className="section-heading">Personal Information</div>

      {field('Full Name',  'name',  'text', 'John Doe')}
      {field('Email',      'email', 'email','john@example.com')}

      <div className="row">
        {field('Phone',    'phone', 'tel', '+1 555-000-0000')}
        {field('Location', 'location', 'text', 'City, State')}
      </div>

      <div className="row">
        {field('Website / Portfolio', 'website',  'url', 'https://yoursite.com')}
        {field('LinkedIn URL',        'linkedin', 'url', 'https://linkedin.com/in/...')}
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <label className="form-label" style={{ margin: 0 }}>Professional Summary</label>
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleImprove}
            disabled={improving || !p.summary}
            title="Use AI to improve your summary (requires Gemini API key)"
          >
            {improving ? '⏳ Improving…' : '✨ AI Improve'}
          </button>
        </div>
        <textarea
          className="form-control"
          rows={4}
          value={p.summary || ''}
          onChange={e => updatePersonalInfo('summary', e.target.value)}
          placeholder="Briefly describe your background, skills, and career goals…"
        />
      </div>
    </div>
  )
}
