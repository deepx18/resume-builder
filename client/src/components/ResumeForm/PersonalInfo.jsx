import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
<<<<<<< HEAD
import { useLang }   from '../../context/LanguageContext'
=======
>>>>>>> 1b585c7 (Ready, Set, Go!)
import { improveAiSummary } from '../../services/api'

export default function PersonalInfo() {
  const { resume, updatePersonalInfo } = useResume()
<<<<<<< HEAD
  const { t } = useLang()
  const p = resume.personalInfo
=======
  const p = resume.personalInfo

>>>>>>> 1b585c7 (Ready, Set, Go!)
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
<<<<<<< HEAD
    } catch {
      alert(t.personal.aiError)
=======
    } catch (e) {
      alert('AI improve failed. Check your GEMINI_API_KEY.')
>>>>>>> 1b585c7 (Ready, Set, Go!)
    } finally {
      setImproving(false)
    }
  }

  return (
    <div>
<<<<<<< HEAD
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
=======
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
>>>>>>> 1b585c7 (Ready, Set, Go!)
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
<<<<<<< HEAD
          <label className="form-label" style={{ margin: 0 }}>{t.personal.summary}</label>
=======
          <label className="form-label" style={{ margin: 0 }}>Professional Summary</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleImprove}
            disabled={improving || !p.summary}
<<<<<<< HEAD
          >
            {improving ? t.personal.improving : t.personal.aiImprove}
=======
            title="Use AI to improve your summary (requires Gemini API key)"
          >
            {improving ? '⏳ Improving…' : '✨ AI Improve'}
>>>>>>> 1b585c7 (Ready, Set, Go!)
          </button>
        </div>
        <textarea
          className="form-control"
          rows={4}
          value={p.summary || ''}
          onChange={e => updatePersonalInfo('summary', e.target.value)}
<<<<<<< HEAD
          placeholder={t.personal.summaryPlaceholder}
=======
          placeholder="Briefly describe your background, skills, and career goals…"
>>>>>>> 1b585c7 (Ready, Set, Go!)
        />
      </div>
    </div>
  )
}
