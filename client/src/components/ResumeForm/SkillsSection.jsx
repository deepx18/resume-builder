import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { useLang }   from '../../context/LanguageContext'

export default function SkillsSection() {
  const { resume, addSkill, removeSkill } = useResume()
  const { t } = useLang()
  const [input, setInput] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = input.replace(/,/g, '').trim()
      if (val) { addSkill(val); setInput('') }
    }
  }

  const handleAdd = () => {
    const val = input.trim()
    if (val) { addSkill(val); setInput('') }
  }

  return (
    <div>
      <div className="section-heading">{t.skills.heading}</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, minHeight: 40 }}>
        {resume.skills.length === 0 && (
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.skills.empty}</span>
        )}
        {resume.skills.map((s, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'var(--primary-light)', color: 'var(--primary)',
            border: '1px solid #bfdbfe', padding: '4px 10px',
            borderRadius: 999, fontSize: 13, fontWeight: 500,
          }}>
            {s}
            <button
              onClick={() => removeSkill(i)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', padding: 0, fontSize: 14, lineHeight: 1 }}
            >×</button>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          className="form-control"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.skills.inputPlaceholder}
        />
        <button className="btn btn-primary" onClick={handleAdd} disabled={!input.trim()}>
          {t.skills.add}
        </button>
      </div>

      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
        {t.skills.hint}{' '}
        <kbd style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 3, border: '1px solid #d1d5db' }}>Enter</kbd>
        {' '}{t.skills.hintOr}{' '}
        <kbd style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: 3, border: '1px solid #d1d5db' }}>,</kbd>
        {' '}{t.skills.hintAfter}
      </p>

      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-muted)' }}>
          {t.skills.suggested}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[
            'JavaScript','TypeScript','React','Node.js','Python','Java','SQL',
            'MongoDB','Docker','Git','AWS','CSS','HTML','REST APIs','GraphQL'
          ].filter(s => !resume.skills.includes(s)).map(s => (
            <button
              key={s}
              onClick={() => addSkill(s)}
              style={{
                background: 'var(--bg-white)', border: '1px solid var(--border)',
                borderRadius: 999, padding: '3px 10px', fontSize: 12,
                cursor: 'pointer', color: 'var(--text)',
              }}
            >{s}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
