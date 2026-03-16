import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useResume, defaultResume } from '../context/ResumeContext'
import { getResume, createResume, updateResume, downloadPdf } from '../services/api'
import ResumeForm    from '../components/ResumeForm'
import ResumePreview from '../components/ResumePreview'

export default function EditorPage() {
  const { id }                        = useParams()
  const navigate                       = useNavigate()
  const { resume, setResume, setSaved } = useResume()

  const [currentId, setCurrentId] = useState(id || null)
  const [saving,    setSaving]    = useState(false)
  const [exporting, setExporting] = useState(false)
  const [toast,     setToast]     = useState(null)
  const [activeTab, setActiveTab] = useState('form')  // 'form' | 'preview' (mobile)

  // Load existing resume
  useEffect(() => {
    if (id) {
      getResume(id)
        .then(({ data }) => { setResume(data); setSaved(true) })
        .catch(() => { showToast('Resume not found', 'error'); navigate('/') })
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
      if (currentId) {
        await updateResume(currentId, resume)
      } else {
        const { data } = await createResume(resume)
        setCurrentId(data._id)
        navigate(`/editor/${data._id}`, { replace: true })
      }
      setSaved(true)
      showToast('Resume saved!', 'success')
    } catch (e) {
      showToast('Failed to save. Is the server running?', 'error')
    } finally {
      setSaving(false)
    }
  }, [resume, currentId, navigate])

  const handleDownload = useCallback(async () => {
    if (!currentId) {
      showToast('Save your resume first!', 'error')
      return
    }
    setExporting(true)
    try {
      const { data } = await downloadPdf(currentId)
      const url  = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href  = url
      link.download = `${resume.personalInfo?.name?.replace(/\s+/g, '_') || 'resume'}.pdf`
      link.click()
      URL.revokeObjectURL(url)
      showToast('PDF downloaded!')
    } catch (e) {
      showToast('PDF generation failed. Make sure Puppeteer is installed.', 'error')
    } finally {
      setExporting(false)
    }
  }, [currentId, resume])

  // Keyboard shortcut: Ctrl+S
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)' }}>

      {/* Editor Toolbar */}
      <div style={{
        background: 'var(--bg-white)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
      }}>
        {/* Title */}
        <input
          value={resume.title}
          onChange={e => { setResume(prev => ({ ...prev, title: e.target.value })); setSaved(false) }}
          style={{
            border: 'none', outline: 'none', fontSize: 16,
            fontWeight: 600, background: 'transparent', flex: 1, minWidth: 0,
          }}
          placeholder="Resume title…"
        />

        {/* Mobile tab toggle */}
        <div className="mobile-tabs" style={{ display: 'flex', gap: 4 }}>
          <button
            className={`btn btn-sm ${activeTab === 'form' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('form')}
            style={{ display: 'none' }}
            data-mobile-tab="form"
          >Form</button>
          <button
            className={`btn btn-sm ${activeTab === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('preview')}
            style={{ display: 'none' }}
            data-mobile-tab="preview"
          >Preview</button>
        </div>

        <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>
          Ctrl+S to save
        </span>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Saving…</> : '💾 Save'}
        </button>

        <button
          className="btn btn-success btn-sm"
          onClick={handleDownload}
          disabled={exporting}
        >
          {exporting ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Exporting…</> : '⬇ PDF'}
        </button>
      </div>

      {/* Editor Body — Form | Preview split */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left: Form */}
        <div style={{
          width: '45%',
          minWidth: 320,
          overflowY: 'auto',
          borderRight: '1px solid var(--border)',
          background: 'var(--bg)',
          padding: '20px',
        }}>
          <ResumeForm />
        </div>

        {/* Right: Preview */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          background: '#e5e7eb',
          display: 'flex',
          justifyContent: 'center',
          padding: '24px',
        }}>
          <div style={{
            background: '#fff',
            width: '100%',
            maxWidth: 680,
            minHeight: 900,
            boxShadow: '0 4px 24px rgba(0,0,0,.15)',
            borderRadius: 4,
            padding: '28px 32px',
          }}>
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>{toast.msg}</div>
      )}
    </div>
  )
}
