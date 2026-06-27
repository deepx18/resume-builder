import { useState, useEffect, useRef } from 'react'
import { TEMPLATES } from './templates'
import { useResume } from '../../context/ResumeContext'
import { useLang }   from '../../context/LanguageContext'

export default function TemplatePicker({ onClose }) {
  const { resume, setResume, setSaved } = useResume()
  const { t } = useLang()
  const [selected, setSelected] = useState(resume.template || 'classic')
  const overlayRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const apply = () => {
    setResume(prev => ({ ...prev, template: selected }))
    setSaved(false)
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--overlay)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div style={{
        background: 'var(--bg-white)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: 720,
        maxHeight: '85vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>🎨 {t.templatePicker?.title || 'Choose a Template'}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              {t.templatePicker?.subtitle || 'Select a style for your resume. Changes apply to both preview and exported PDF.'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}
          >×</button>
        </div>

        {/* Grid */}
        <div style={{
          overflowY: 'auto',
          padding: '20px 24px',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16,
          alignContent: 'start',
        }}>
          {TEMPLATES.map(tmpl => {
            const isActive = selected === tmpl.key
            return (
              <button
                key={tmpl.key}
                onClick={() => setSelected(tmpl.key)}
                style={{
                  border: `2px solid ${isActive ? tmpl.accent : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  background: isActive ? `${tmpl.accent}18` : 'var(--bg-white)',
                  cursor: 'pointer',
                  padding: "5px 25px",
                  overflow: 'hidden',
                  transition: 'border-color .15s, box-shadow .15s',
                  boxShadow: isActive ? `0 0 0 3px ${tmpl.accent}30` : 'none',
                  textAlign: 'start',
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  background: 'var(--template-thumb-bg)',
                  borderBottom: `1px solid ${isActive ? tmpl.accent : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 8px',
                  minHeight: 130,
                }}
                  dangerouslySetInnerHTML={{ __html: tmpl.thumbnail }}
                />

                {/* Label */}
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: tmpl.accent, flexShrink: 0,
                    }}/>
                    <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{tmpl.name}</span>
                    {isActive && (
                      <span style={{
                        marginInlineStart: 'auto',
                        fontSize: 10, fontWeight: 700,
                        background: tmpl.accent, color: '#fff',
                        padding: '1px 6px', borderRadius: 10,
                      }}>✓ Active</span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{tmpl.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 10,
          flexShrink: 0,
        }}>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            {t.templatePicker?.cancel || 'Cancel'}
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={apply}
            disabled={selected === resume.template}
          >
            {t.templatePicker?.apply || 'Apply Template'}
          </button>
        </div>
      </div>
    </div>
  )
}
