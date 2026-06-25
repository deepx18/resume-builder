import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllResumes, deleteResume } from '../services/api'
import { useResume, defaultResume } from '../context/ResumeContext'
import { useLang } from '../context/LanguageContext'

const templateAccent = {
  classic: '#2563eb',
  modern: '#1e3a5f',
  minimal: '#111827',
  executive: '#b7860b',
  creative: '#0d9488',
}

export default function HomePage() {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { setResume, setSaved } = useResume()
  const { t } = useLang()

  useEffect(() => { fetchResumes() }, [])

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return resumes
    return resumes.filter(r => (r.title || t.home.untitled).toLowerCase().includes(q))
  }, [query, resumes, t.home.untitled])

  const handleNew = () => {
    setResume(defaultResume)
    setSaved(false)
    navigate('/editor')
  }

  const handleEdit = (id) => navigate(`/editor/${id}`)

  const handleDelete = async (resume, e) => {
    e.stopPropagation()
    if (!window.confirm(`${t.home.deleteConfirm}\n${resume.title || t.home.untitled}`)) return
    setDeleting(resume._id)
    try {
      await deleteResume(resume._id)
      setResumes(prev => prev.filter(r => r._id !== resume._id))
    } catch {
      alert(t.home.deleteError)
    } finally {
      setDeleting(null)
    }
  }

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <h1>{t.home.title}</h1>
          <p>{t.home.subtitle} {resumes.length > 0 && `(${resumes.length} total)`}</p>
        </div>

        <div className="dashboard-tools">
          <label className="search-field">
            <span className="material-symbols-outlined">search</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search resumes..."
            />
          </label>
          <button className="btn btn-primary" onClick={handleNew}>
            <span className="material-symbols-outlined">add</span>
            {t.home.newResume}
          </button>
        </div>
      </section>

      {loading ? (
        <div className="resume-grid">
          {[0, 1, 2, 3].map(i => <ResumeSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state dashboard-empty">
          <span className="material-symbols-outlined">description</span>
          <h3>{resumes.length ? 'No matching resumes' : t.home.noResumes}</h3>
          <p>{resumes.length ? 'Try a different search term.' : t.home.noResumesHint}</p>
          {!resumes.length && (
            <button className="btn btn-primary" onClick={handleNew}>
              <span className="material-symbols-outlined">add</span>
              {t.home.newResume}
            </button>
          )}
        </div>
      ) : (
        <div className="resume-grid">
          {filtered.map((resume, index) => (
            <article
              key={resume._id}
              className="resume-card"
              onClick={() => handleEdit(resume._id)}
            >
              <div className="resume-card-preview">
                <MiniResume resume={resume} index={index} />
                <div className="resume-card-overlay">
                  <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); handleEdit(resume._id) }}>
                    {t.home.edit}
                  </button>
                </div>
              </div>

              <div className="resume-card-body">
                <div>
                  <h2>{resume.title || t.home.untitled}</h2>
                  <p>
                    <span className="material-symbols-outlined">schedule</span>
                    {t.home.updated} {fmtDate(resume.updatedAt)}
                  </p>
                </div>
                <button
                  className="icon-button danger"
                  disabled={deleting === resume._id}
                  onClick={(e) => handleDelete(resume, e)}
                  title="Delete resume"
                >
                  <span className="material-symbols-outlined">{deleting === resume._id ? 'hourglass_empty' : 'delete'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <button className="mobile-fab" onClick={handleNew} title={t.home.newResume}>
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  )
}

function ResumeSkeleton() {
  return (
    <div className="resume-card skeleton-card">
      <div className="resume-card-preview skeleton" />
      <div className="resume-card-body">
        <div className="skeleton-lines">
          <span />
          <small />
        </div>
      </div>
    </div>
  )
}

function MiniResume({ resume, index }) {
  const accent = templateAccent[resume.template] || ['#2563eb', '#0d9488', '#b7860b', '#1e3a5f'][index % 4]
  return (
    <div className="mini-resume" style={{ '--mini-accent': accent }}>
      <div className="mini-resume-header">
        <span />
        <strong />
      </div>
      <div className="mini-resume-section wide" />
      <div className="mini-resume-lines">
        <span /><span /><span />
      </div>
      <div className="mini-resume-section" />
      <div className="mini-resume-entry">
        <strong /><span /><span />
      </div>
      <div className="mini-resume-section short" />
      <div className="mini-resume-chips">
        <span /><span /><span />
      </div>
    </div>
  )
}
