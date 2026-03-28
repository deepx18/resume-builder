import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { useLang }   from '../../context/LanguageContext'
import { getAiSuggestions } from '../../services/api'

export default function ExperienceSection() {
  const {
    resume,
    addExperience, updateExperience, removeExperience,
    updateBullet, addBullet, removeBullet,
  } = useResume()
  const { t } = useLang()

  const [aiLoading, setAiLoading] = useState(null)
  const [aiJob,     setAiJob]     = useState({})

  const handleAiSuggest = async (i) => {
    const role = aiJob[i] || resume.experience[i]?.role || ''
    if (!role) { alert(t.experience.aiRoleRequired); return }
    setAiLoading(i)
    try {
      const { data } = await getAiSuggestions(role)
      const current = resume.experience[i].bullets || []
      const merged  = [...current.filter(b => b.trim()), ...data.bullets]
      updateExperience(i, 'bullets', merged)
    } catch {
      alert(t.experience.aiError)
    } finally {
      setAiLoading(null)
    }
  }

  return (
    <div>
      <div className="section-heading">{t.experience.heading}</div>

      {resume.experience.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
          {t.experience.empty}
        </p>
      )}

      {resume.experience.map((exp, i) => (
        <div key={exp._id || i} className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{t.experience.entryLabel}{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeExperience(i)}>{t.experience.remove}</button>
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">{t.experience.role}</label>
              <input className="form-control" value={exp.role || ''} placeholder="Software Engineer"
                onChange={e => updateExperience(i, 'role', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">{t.experience.company}</label>
              <input className="form-control" value={exp.company || ''} placeholder="Acme Corp"
                onChange={e => updateExperience(i, 'company', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t.experience.location}</label>
            <input className="form-control" value={exp.location || ''} placeholder="New York, NY"
              onChange={e => updateExperience(i, 'location', e.target.value)} />
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">{t.experience.startDate}</label>
              <input className="form-control" value={exp.startDate || ''} placeholder="Jan 2022"
                onChange={e => updateExperience(i, 'startDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">{t.experience.endDate}</label>
              <input
                className="form-control"
                value={exp.current ? t.pdf.present : (exp.endDate || '')}
                placeholder="Dec 2024"
                disabled={exp.current}
                onChange={e => updateExperience(i, 'endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" id={`current-${i}`} checked={!!exp.current}
              onChange={e => updateExperience(i, 'current', e.target.checked)} />
            <label htmlFor={`current-${i}`} style={{ fontSize: 13 }}>{t.experience.current}</label>
          </div>

          {/* Bullets */}
          <div style={{ marginBottom: 8 }}>
            <label className="form-label">{t.experience.bullets}</label>
            {(exp.bullets || []).map((b, j) => (
              <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <input
                  className="form-control"
                  value={b}
                  placeholder={`${t.experience.bulletPlaceholder} ${j + 1}…`}
                  onChange={e => updateBullet(i, j, e.target.value)}
                />
                <button className="btn btn-secondary btn-sm" onClick={() => removeBullet(i, j)} style={{ flexShrink: 0 }}>✕</button>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" onClick={() => addBullet(i)}>
              {t.experience.addBullet}
            </button>
          </div>

          {/* AI Suggestions */}
          <div style={{
            background: 'var(--primary-light)',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius)',
            padding: 12,
            marginTop: 8,
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', marginBottom: 8 }}>
              {t.experience.aiTitle}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="form-control"
                style={{ fontSize: 13 }}
                placeholder={t.experience.aiPlaceholder}
                value={aiJob[i] || ''}
                onChange={e => setAiJob(prev => ({ ...prev, [i]: e.target.value }))}
              />
              <button
                className="btn btn-primary btn-sm"
                style={{ flexShrink: 0 }}
                onClick={() => handleAiSuggest(i)}
                disabled={aiLoading === i}
              >
                {aiLoading === i ? t.experience.aiLoading : t.experience.aiGenerate}
              </button>
            </div>
            <p style={{ fontSize: 11, color: '#4b5563', marginTop: 6 }}>{t.experience.aiNote}</p>
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addExperience} style={{ width: '100%' }}>
        {t.experience.addExperience}
      </button>
    </div>
  )
}
