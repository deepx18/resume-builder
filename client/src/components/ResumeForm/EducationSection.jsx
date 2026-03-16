import { useResume } from '../../context/ResumeContext'

export default function EducationSection() {
  const { resume, addEducation, updateEducation, removeEducation } = useResume()

  return (
    <div>
      <div className="section-heading">Education</div>

      {resume.education.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
          No education entries yet. Click below to add one.
        </p>
      )}

      {resume.education.map((edu, i) => (
        <div key={edu._id || i} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Education #{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeEducation(i)}>✕ Remove</button>
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">Institution</label>
              <input className="form-control" value={edu.institution || ''} placeholder="MIT"
                onChange={e => updateEducation(i, 'institution', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Degree</label>
              <input className="form-control" value={edu.degree || ''} placeholder="Bachelor of Science"
                onChange={e => updateEducation(i, 'degree', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">Field of Study</label>
              <input className="form-control" value={edu.field || ''} placeholder="Computer Science"
                onChange={e => updateEducation(i, 'field', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">GPA (optional)</label>
              <input className="form-control" value={edu.gpa || ''} placeholder="3.8"
                onChange={e => updateEducation(i, 'gpa', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input className="form-control" value={edu.startDate || ''} placeholder="Sep 2020"
                onChange={e => updateEducation(i, 'startDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input className="form-control" value={edu.endDate || ''} placeholder="May 2024"
                onChange={e => updateEducation(i, 'endDate', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addEducation} style={{ width: '100%' }}>
        + Add Education
      </button>
    </div>
  )
}
