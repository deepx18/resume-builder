import { useResume } from '../../context/ResumeContext'
import { useLang }   from '../../context/LanguageContext'

export default function ProjectsSection() {
  const { resume, addProject, updateProject, removeProject } = useResume()
  const { t } = useLang()

  return (
    <div>
      <div className="section-heading">{t.projects.heading}</div>

      {resume.projects.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
          {t.projects.empty}
        </p>
      )}

      {resume.projects.map((proj, i) => (
        <div key={proj._id || i} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{t.projects.entryLabel}{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeProject(i)}>{t.projects.remove}</button>
          </div>

          <div className="form-group">
            <label className="form-label">{t.projects.name}</label>
            <input className="form-control" value={proj.name || ''} placeholder="My Awesome App"
              onChange={e => updateProject(i, 'name', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">{t.projects.technologies}</label>
            <input className="form-control" value={proj.technologies || ''} placeholder="React, Node.js, MongoDB"
              onChange={e => updateProject(i, 'technologies', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">{t.projects.description}</label>
            <textarea className="form-control" rows={3} value={proj.description || ''}
              placeholder="What does this project do?"
              onChange={e => updateProject(i, 'description', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">{t.projects.link}</label>
            <input className="form-control" type="url" value={proj.link || ''} placeholder="https://github.com/you/project"
              onChange={e => updateProject(i, 'link', e.target.value)} />
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addProject} style={{ width: '100%' }}>
        {t.projects.addProject}
      </button>
    </div>
  )
}
