import { useResume } from '../../context/ResumeContext'
<<<<<<< HEAD
import { useLang }   from '../../context/LanguageContext'

export default function EducationSection() {
  const { resume, addEducation, updateEducation, removeEducation } = useResume()
  const { t } = useLang()

  return (
    <div>
      <div className="section-heading">{t.education.heading}</div>

      {resume.education.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
          {t.education.empty}
=======

export default function EducationSection() {
  const { resume, addEducation, updateEducation, removeEducation } = useResume()

  return (
    <div>
      <div className="section-heading">Education</div>

      {resume.education.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
          No education entries yet. Click below to add one.
>>>>>>> 1b585c7 (Ready, Set, Go!)
        </p>
      )}

      {resume.education.map((edu, i) => (
        <div key={edu._id || i} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
<<<<<<< HEAD
            <span style={{ fontWeight: 600, fontSize: 13 }}>{t.education.entryLabel}{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeEducation(i)}>{t.education.remove}</button>
=======
            <span style={{ fontWeight: 600, fontSize: 13 }}>Education #{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeEducation(i)}>✕ Remove</button>
>>>>>>> 1b585c7 (Ready, Set, Go!)
          </div>

          <div className="row">
            <div className="form-group">
<<<<<<< HEAD
              <label className="form-label">{t.education.institution}</label>
=======
              <label className="form-label">Institution</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
              <input className="form-control" value={edu.institution || ''} placeholder="MIT"
                onChange={e => updateEducation(i, 'institution', e.target.value)} />
            </div>
            <div className="form-group">
<<<<<<< HEAD
              <label className="form-label">{t.education.degree}</label>
=======
              <label className="form-label">Degree</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
              <input className="form-control" value={edu.degree || ''} placeholder="Bachelor of Science"
                onChange={e => updateEducation(i, 'degree', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
<<<<<<< HEAD
              <label className="form-label">{t.education.field}</label>
=======
              <label className="form-label">Field of Study</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
              <input className="form-control" value={edu.field || ''} placeholder="Computer Science"
                onChange={e => updateEducation(i, 'field', e.target.value)} />
            </div>
            <div className="form-group">
<<<<<<< HEAD
              <label className="form-label">{t.education.gpa}</label>
=======
              <label className="form-label">GPA (optional)</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
              <input className="form-control" value={edu.gpa || ''} placeholder="3.8"
                onChange={e => updateEducation(i, 'gpa', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
<<<<<<< HEAD
              <label className="form-label">{t.education.startDate}</label>
=======
              <label className="form-label">Start Date</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
              <input className="form-control" value={edu.startDate || ''} placeholder="Sep 2020"
                onChange={e => updateEducation(i, 'startDate', e.target.value)} />
            </div>
            <div className="form-group">
<<<<<<< HEAD
              <label className="form-label">{t.education.endDate}</label>
=======
              <label className="form-label">End Date</label>
>>>>>>> 1b585c7 (Ready, Set, Go!)
              <input className="form-control" value={edu.endDate || ''} placeholder="May 2024"
                onChange={e => updateEducation(i, 'endDate', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addEducation} style={{ width: '100%' }}>
<<<<<<< HEAD
        {t.education.addEducation}
=======
        + Add Education
>>>>>>> 1b585c7 (Ready, Set, Go!)
      </button>
    </div>
  )
}
