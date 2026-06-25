import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { useLang }   from '../../context/LanguageContext'
import { improveAiSummary } from '../../services/api'

export default function PersonalInfo() {
  const { resume, updatePersonalInfo } = useResume()
  const { t } = useLang()
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
    } catch {
      alert(t.personal.aiError)
    } finally {
      setImproving(false)
    }
  }

  return (
    <div>
      <div className="section-heading">{t.personal.heading}</div>

      {field(t.personal.fullName,  'name',  'text',  'John Doe')}
      {field(t.personal.email,     'email', 'email', 'john@example.com')}

      <div className="row">
        {field(t.personal.phone,    'phone',    'tel',  '+1 555-000-0000')}
        {field(t.personal.location, 'location', 'text', 'City, State')}
      </div>

      <div className="row">
        {field(t.personal.website,  'website',  'url', 'https://yoursite.com')}
        {field(t.personal.linkedin, 'linkedin', 'url', 'https://linkedin.com/in/...')}
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <label className="form-label" style={{ margin: 0 }}>{t.personal.summary}</label>
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleImprove}
            disabled={improving || !p.summary}
          >
            {improving ? t.personal.improving : t.personal.aiImprove}
          </button>
        </div>
        <textarea
          className="form-control"
          rows={4}
          value={p.summary || ''}
          onChange={e => updatePersonalInfo('summary', e.target.value)}
          placeholder={t.personal.summaryPlaceholder}
        />
      </div>
    </div>
  )
}
