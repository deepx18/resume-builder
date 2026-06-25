import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResume, defaultResume } from '../context/ResumeContext'
import { useLang } from '../context/LanguageContext'
import { getResume, createResume, updateResume, downloadPdf } from '../services/api'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import TemplatePicker from '../components/TemplatePicker'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { TEMPLATE_MAP } from '../components/TemplatePicker/templates'

export default function EditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { resume, setResume, saved, setSaved } = useResume()
  const { t, lang } = useLang()

  const [currentId, setCurrentId] = useState(id || null)
  const [saving, setSaving] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [toast, setToast] = useState(null)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)

  const currentTemplate = TEMPLATE_MAP[resume.template] || TEMPLATE_MAP.classic

  useEffect(() => {
    setCurrentId(id || null)
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
      const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
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
    <div className="editor-page">
      <header className="editor-topbar">
        <div className="editor-titlebar">
          <button className="icon-button" onClick={() => navigate('/')} title={t.editor.back}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="topbar-divider" />
          <input
            value={resume.title || ''}
            onChange={e => { setResume(prev => ({ ...prev, title: e.target.value })); setSaved(false) }}
            placeholder={t.editor.titlePlaceholder}
            className="editor-title-input"
          />
        </div>

        <div className="editor-actions">
          <span className="save-state">{saved ? t.editor.saved : t.editor.ctrlS}</span>
          <LanguageSwitcher />
          <button className="btn btn-secondary btn-sm" onClick={() => setMobilePreview(v => !v)}>
            <span className="material-symbols-outlined">visibility</span>
            {mobilePreview ? t.editor.formTab : t.editor.previewTab}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowTemplatePicker(true)}>
            <span className="template-dot" style={{ background: currentTemplate.accent }} />
            {currentTemplate.name}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleSave} disabled={saving}>
            {saving ? <><span className="spinner dark" /> {t.editor.saving}</> : <><span className="material-symbols-outlined">save</span>{t.editor.save.replace('💾 ', '')}</>}
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={exporting}>
            {exporting ? <><span className="spinner" /> {t.editor.exporting}</> : <><span className="material-symbols-outlined">ios_share</span>{t.editor.pdf.replace('⬇ ', '')}</>}
          </button>
        </div>
      </header>

      <main className={`editor-workspace ${mobilePreview ? 'show-preview' : ''}`}>
        <aside className="editor-sidebar">
          <nav className="editor-mode-tabs">
            <button className="active">Content</button>
            <button onClick={() => setShowTemplatePicker(true)}>Design</button>
            <button onClick={() => setShowTemplatePicker(true)}>Layout</button>
            <button>Settings</button>
          </nav>
          <div className="editor-form-scroll">
            <ResumeForm />
          </div>
        </aside>

        <section className="preview-stage">
          <div className="preview-controls">
            <button className="icon-button" title="Zoom in">
              <span className="material-symbols-outlined">zoom_in</span>
            </button>
            <button className="icon-button" title="Zoom out">
              <span className="material-symbols-outlined">zoom_out</span>
            </button>
            <button className="icon-button" title="Fullscreen">
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>
          <div className="resume-paper">
            <ResumePreview />
          </div>
        </section>
      </main>

      {showTemplatePicker && (
        <TemplatePicker onClose={() => setShowTemplatePicker(false)} />
      )}

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
