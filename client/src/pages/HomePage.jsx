import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllResumes, deleteResume, createResume } from '../services/api'
import { useResume } from '../context/ResumeContext'
import { defaultResume } from '../context/ResumeContext'

export default function HomePage() {
  const [resumes,  setResumes]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [deleting, setDeleting] = useState(null)
  const navigate  = useNavigate()
  const { setResume, setSaved } = useResume()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const { data } = await getAllResumes()
      setResumes(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleNew = async () => {
    setResume(defaultResume)
    setSaved(false)
    navigate('/editor')
  }

  const handleEdit = async (id) => {
    navigate(`/editor/${id}`)
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('Delete this resume?')) return
    setDeleting(id)
    try {
      await deleteResume(id)
      setResumes(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      alert('Could not delete resume.')
    } finally {
      setDeleting(null)
    }
  }

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      {/* Hero */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>My Resumes</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            Create, edit, and export professional resumes in minutes.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleNew}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Resume
        </button>
      </div>

      {/* Resume List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-muted)' }}>
          Loading…
        </div>
      ) : resumes.length === 0 ? (
        <div className="empty-state card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <h3>No resumes yet</h3>
          <p>Click <strong>New Resume</strong> to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {resumes.map(r => (
            <div
              key={r._id}
              className="card"
              onClick={() => handleEdit(r._id)}
              style={{ cursor: 'pointer', transition: 'box-shadow .15s', position: 'relative' }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow)'}
            >
              {/* Icon */}
              <div style={{
                width: 44, height: 44, background: 'var(--primary-light)',
                borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: 12,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                {r.title || 'Untitled Resume'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                Updated {fmtDate(r.updatedAt)}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ flex: 1 }}
                  onClick={(e) => { e.stopPropagation(); handleEdit(r._id) }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={deleting === r._id}
                  onClick={(e) => handleDelete(r._id, e)}
                >
                  {deleting === r._id ? '…' : '🗑'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
