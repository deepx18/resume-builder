import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResume, defaultResume } from '../context/ResumeContext'
import { useLang }  from '../context/LanguageContext'
import { getResume, createResume, updateResume, downloadPdf } from '../services/api'
import ResumeForm    from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import TemplatePicker from '../components/TemplatePicker'
import { TEMPLATE_MAP } from '../components/TemplatePicker/templates'

export default function EditorPage() {
  const { id }                         = useParams()
  const navigate                        = useNavigate()
  const { resume, setResume, setSaved } = useResume()
  const { t, lang } = useLang()

  const [currentId,       setCurrentId]       = useState(id || null)
  const [saving,          setSaving]          = useState(false)
  const [exporting,       setExporting]       = useState(false)
  const [toast,           setToast]           = useState(null)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)

  const currentTemplate = TEMPLATE_MAP[resume.template] || TEMPLATE_MAP['classic']

  useEffect(() => {
    if (id) {
      getResume(id)
        .then(({ data }) => { setResume(data); setSaved(true) })
        .catch(() => { showToast(t.editor.notFound, 'error'); navigate('/') })
    } else {
      setResume(defaultResume)
      setSaved(false)
    }
  }, [id])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      const payload = { ...resume, lang }
      if (currentId) {
        await updateResume(currentId, payload)
      } else {
        const { data } = await createResume(payload)
        setCurrentId(data._id)
        navigate(`/editor/${data._id}`, { replace: true })
      }
      setSaved(true)
      showToast(t.editor.saved, 'success')
    } catch {
      showToast(t.editor.saveError, 'error')
    } finally {
      setSaving(false)
    }
  }, [resume, currentId, navigate, t, lang])

  const handleDownload = useCallback(async () => {
    if (!currentId) { showToast(t.editor.saveFirst, 'error'); return }
    setExporting(true)
    try {
      const { data } = await downloadPdf(currentId)
      const url  = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href  = url
      link.download = `${resume.personalInfo?.name?.replace(/\s+/g, '_') || 'resume'}.pdf`
      link.click()
      URL.revokeObjectURL(url)
      showToast(t.editor.pdfSuccess)
    } catch {
      showToast(t.editor.pdfError, 'error')
    } finally {
      setExporting(false)
    }
  }, [currentId, resume, t])

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)' }}>

      {/* Toolbar */}
      <div style={{
        background: 'var(--bg-white)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
        flexWrap: 'wrap',
      }}>
        <input
          value={resume.title}
          onChange={e => { setResume(prev => ({ ...prev, title: e.target.value })); setSaved(false) }}
          style={{ border: 'none', outline: 'none', fontSize: 16, fontWeight: 600, background: 'transparent', flex: 1, minWidth: 140 }}
          placeholder={t.editor.titlePlaceholder}
        />

        {/* Template badge + picker trigger */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowTemplatePicker(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            borderColor: currentTemplate.accent,
            color: currentTemplate.accent,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: currentTemplate.accent, flexShrink: 0 }} />
          {t.templatePicker?.button || '🎨 Template'}
          <span style={{ fontWeight: 400, opacity: .7 }}>· {currentTemplate.name}</span>
        </button>

        <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{t.editor.ctrlS}</span>

        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/')}>
          {t.editor.back}
        </button>

        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          {saving
            ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> {t.editor.saving}</>
            : t.editor.save}
        </button>

        <button className="btn btn-success btn-sm" onClick={handleDownload} disabled={exporting}>
          {exporting
            ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> {t.editor.exporting}</>
            : t.editor.pdf}
        </button>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{
          width: '45%', minWidth: 320,
          overflowY: 'auto',
          borderInlineEnd: '1px solid var(--border)',
          background: 'var(--bg)',
          padding: '20px',
        }}>
          <ResumeForm />
        </div>

        <div style={{
          flex: 1, overflowY: 'auto',
          background: '#e5e7eb',
          display: 'flex', justifyContent: 'center',
          padding: '24px',
        }}>
          <div style={{
            background: '#fff',
            width: '100%', maxWidth: 680, minHeight: 900,
            boxShadow: '0 4px 24px rgba(0,0,0,.15)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Template Picker Modal */}
      {showTemplatePicker && (
        <TemplatePicker onClose={() => setShowTemplatePicker(false)} />
      )}

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
