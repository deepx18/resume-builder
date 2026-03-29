import { useResume } from '../../context/ResumeContext'
<<<<<<< HEAD
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
=======

export default function ProjectsSection() {
  const { resume, addProject, updateProject, removeProject } = useResume()

  return (
    <div>
      <div className="section-heading">Projects</div>

      {resume.projects.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
          No projects yet. Add side projects, open source work, or academic projects.
>>>>>>> 1b585c7 (Ready, Set, Go!)
        </p>
      )}

      {resume.projects.map((proj, i) => (
        <div key={proj._id || i} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
<<<<<<< HEAD
            <span style={{ fontWeight: 600, fontSize: 13 }}>{t.projects.entryLabel}{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeProject(i)}>{t.projects.remove}</button>
          </div>

          <div className="form-group">
            <label className="form-label">{t.projects.name}</label>
=======
            <span style={{ fontWeight: 600, fontSize: 13 }}>Project #{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeProject(i)}>✕ Remove</button>
          </div>

          <div className="form-group">
            <label className="form-label">Project Name</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
            <input className="form-control" value={proj.name || ''} placeholder="My Awesome App"
              onChange={e => updateProject(i, 'name', e.target.value)} />
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label className="form-label">{t.projects.technologies}</label>
=======
            <label className="form-label">Technologies Used</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
            <input className="form-control" value={proj.technologies || ''} placeholder="React, Node.js, MongoDB"
              onChange={e => updateProject(i, 'technologies', e.target.value)} />
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label className="form-label">{t.projects.description}</label>
            <textarea className="form-control" rows={3} value={proj.description || ''}
              placeholder="What does this project do?"
=======
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3} value={proj.description || ''}
              placeholder="What does this project do? What problem does it solve?"
>>>>>>> 1b585c7 (Ready, Set, Go!)
              onChange={e => updateProject(i, 'description', e.target.value)} />
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label className="form-label">{t.projects.link}</label>
=======
            <label className="form-label">Link (GitHub / Live URL)</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
            <input className="form-control" type="url" value={proj.link || ''} placeholder="https://github.com/you/project"
              onChange={e => updateProject(i, 'link', e.target.value)} />
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addProject} style={{ width: '100%' }}>
<<<<<<< HEAD
        {t.projects.addProject}
=======
        + Add Project
>>>>>>> 1b585c7 (Ready, Set, Go!)
      </button>
    </div>
  )
}
