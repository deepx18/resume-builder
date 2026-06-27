import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResume, defaultResume } from '../context/ResumeContext'
import { useLang } from '../context/LanguageContext'
import { getResume, createResume, updateResume, downloadPdf } from '../services/api'
import ResumeForm from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'
import TemplatePicker from '../components/TemplatePicker'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ThemeToggle'
import { TEMPLATES, TEMPLATE_MAP } from '../components/TemplatePicker/templates'

// ─── Inline Design Panel ───────────────────────────────────────────────────
function DesignPanel() {
  const { resume, setResume, setSaved } = useResume()
  const { t } = useLang()
  const [selected, setSelected] = useState(resume.template || 'classic')

  const apply = (key) => {
    setSelected(key)
    setResume(prev => ({ ...prev, template: key }))
    setSaved(false)
  }

  return (
    <div style={{ padding: '0 0 24px' }}>
      <div className="section-heading" style={{ marginBottom: 16 }}>
        {t.templatePicker?.title || 'Choose a Template'}
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.5 }}>
        {t.templatePicker?.subtitle || 'Select a style. Changes apply instantly to the preview and PDF.'}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
      }}>
        {TEMPLATES.map(tmpl => {
          const isActive = selected === tmpl.key
          return (
            <button
              key={tmpl.key}
              onClick={() => apply(tmpl.key)}
              style={{
                border: `2px solid ${isActive ? tmpl.accent : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                background: isActive ? `${tmpl.accent}18` : 'var(--bg-white)',
                cursor: 'pointer',
                padding: 0,
                overflow: 'hidden',
                transition: 'border-color .15s, box-shadow .15s',
                boxShadow: isActive ? `0 0 0 3px ${tmpl.accent}28` : 'none',
                textAlign: 'start',
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  background: 'var(--template-thumb-bg)',
                  borderBottom: `1px solid ${isActive ? tmpl.accent : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 6px',
                  minHeight: 100,
                }}
                dangerouslySetInnerHTML={{ __html: tmpl.thumbnail }}
              />
              {/* Label */}
              <div style={{ padding: '8px 10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: tmpl.accent, flexShrink: 0,
                  }} />
                  <span style={{ fontWeight: 700, fontSize: 12, color: 'var(--text)' }}>
                    {tmpl.name}
                  </span>
                  {isActive && (
                    <span style={{
                      marginInlineStart: 'auto',
                      fontSize: 9, fontWeight: 700,
                      background: tmpl.accent, color: '#fff',
                      padding: '1px 5px', borderRadius: 8,
                    }}>✓</span>
                  )}
                </div>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.3 }}>
                  {tmpl.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Zoom constants ─────────────────────────────────────────────────────────
const ZOOM_STEP = 0.1
const ZOOM_MIN  = 0.5
const ZOOM_MAX  = 1.5

// ─── EditorPage ─────────────────────────────────────────────────────────────
export default function EditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { resume, setResume, saved, setSaved } = useResume()
  const { t, lang } = useLang()

  const [currentId,          setCurrentId]          = useState(id || null)
  const [saving,             setSaving]             = useState(false)
  const [exporting,          setExporting]          = useState(false)
  const [toast,              setToast]              = useState(null)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)

  // ── NEW state ──
  const [previewOnly, setPreviewOnly] = useState(false)   // hides sidebar on all screen sizes
  const [zoom,        setZoom]        = useState(1)        // scale factor for resume paper
  const [activeMode,  setActiveMode]  = useState('content') // 'content' | 'design'

  const currentTemplate = TEMPLATE_MAP[resume.template] || TEMPLATE_MAP.classic

  // ── Load resume ────────────────────────────────────────────────────────────
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

  // ── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ── Save ───────────────────────────────────────────────────────────────────
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

  // ── PDF download ───────────────────────────────────────────────────────────
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

  // ── Keyboard shortcut Ctrl+S ───────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  // ── Zoom helpers ───────────────────────────────────────────────────────────
  const zoomIn  = () => setZoom(z => Math.min(+(z + ZOOM_STEP).toFixed(1), ZOOM_MAX))
  const zoomOut = () => setZoom(z => Math.max(+(z - ZOOM_STEP).toFixed(1), ZOOM_MIN))
  const zoomReset = () => setZoom(1)

  // ── Toggle preview (works on ALL screen sizes) ─────────────────────────────
  const togglePreview = () => setPreviewOnly(v => !v)

  return (
    <div className="editor-page">

      {/* ── Top bar ── */}
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
          <ThemeToggle />

          {/* Preview toggle — now works on desktop too */}
          <button
            className={`btn btn-sm ${previewOnly ? 'btn-primary' : 'btn-secondary'}`}
            onClick={togglePreview}
            title={previewOnly ? 'Back to editor' : 'Preview only'}
          >
            <span className="material-symbols-outlined">
              {previewOnly ? 'edit' : 'visibility'}
            </span>
            {previewOnly ? t.editor.formTab : t.editor.previewTab}
          </button>

          {/* Template button (opens modal — kept for quick access) */}
          <button className="btn btn-secondary btn-sm" onClick={() => setShowTemplatePicker(true)}>
            <span className="template-dot" style={{ background: currentTemplate.accent }} />
            {currentTemplate.name}
          </button>

          <button className="btn btn-secondary btn-sm" onClick={handleSave} disabled={saving}>
            {saving
              ? <><span className="spinner dark" /> {t.editor.saving}</>
              : <><span className="material-symbols-outlined">save</span>{t.editor.save.replace('💾 ', '')}</>}
          </button>

          <button className="btn btn-primary btn-sm" onClick={handleDownload} disabled={exporting}>
            {exporting
              ? <><span className="spinner" /> {t.editor.exporting}</>
              : <><span className="material-symbols-outlined">ios_share</span>{t.editor.pdf.replace('⬇ ', '')}</>}
          </button>
        </div>
      </header>

      {/* ── Workspace ── */}
      <main className="editor-workspace">

        {/* ── Sidebar — hidden when previewOnly ── */}
        {!previewOnly && (
          <aside className="editor-sidebar">

            {/* Mode tabs */}
            <nav className="editor-mode-tabs">
              <button
                className={activeMode === 'content' ? 'active' : ''}
                onClick={() => setActiveMode('content')}
              >
                Content
              </button>
              <button
                className={activeMode === 'design' ? 'active' : ''}
                onClick={() => setActiveMode('design')}
              >
                Design
              </button>
            </nav>

            <div className="editor-form-scroll">
              {activeMode === 'content' && <ResumeForm />}
              {activeMode === 'design'  && <DesignPanel />}
            </div>
          </aside>
        )}

        {/* ── Preview stage ── */}
        {/* On desktop: always flex via CSS. On mobile: hidden via CSS unless previewOnly=true (inline override) */}
        <section
          className="preview-stage"
          style={previewOnly ? { display: 'flex' } : undefined}
        >
          {/* Zoom controls */}
          <div className="preview-controls">
            <button
              className="icon-button"
              title={`Zoom in (${Math.round(zoom * 100)}%)`}
              onClick={zoomIn}
              disabled={zoom >= ZOOM_MAX}
              style={{ opacity: zoom >= ZOOM_MAX ? 0.4 : 1 }}
            >
              <span className="material-symbols-outlined">zoom_in</span>
            </button>

            <button
              className="icon-button"
              title={`Reset zoom (${Math.round(zoom * 100)}%)`}
              onClick={zoomReset}
              style={{
                fontSize: 11, fontWeight: 700, color: 'var(--text-muted)',
                minWidth: 36, padding: '0 4px',
              }}
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              className="icon-button"
              title={`Zoom out (${Math.round(zoom * 100)}%)`}
              onClick={zoomOut}
              disabled={zoom <= ZOOM_MIN}
              style={{ opacity: zoom <= ZOOM_MIN ? 0.4 : 1 }}
            >
              <span className="material-symbols-outlined">zoom_out</span>
            </button>
          </div>

          {/* Paper with zoom transform */}
          <div
            className="resume-paper"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease',
              /* When zoomed out, shrink the container so it doesn't leave dead space */
              marginBottom: zoom < 1 ? `calc((${zoom} - 1) * 900px)` : 0,
            }}
          >
            <ResumePreview />
          </div>
        </section>
      </main>

      {/* ── Template picker modal (still accessible via topbar button) ── */}
      {showTemplatePicker && (
        <TemplatePicker onClose={() => setShowTemplatePicker(false)} />
      )}

      {/* ── Toast ── */}
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
