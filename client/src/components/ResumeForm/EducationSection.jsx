import { useResume } from '../../context/ResumeContext'
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
        </p>
      )}

      {resume.education.map((edu, i) => (
        <div key={edu._id || i} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{t.education.entryLabel}{i + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeEducation(i)}>{t.education.remove}</button>
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">{t.education.institution}</label>
              <input className="form-control" value={edu.institution || ''} placeholder="MIT"
                onChange={e => updateEducation(i, 'institution', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">{t.education.degree}</label>
              <input className="form-control" value={edu.degree || ''} placeholder="Bachelor of Science"
                onChange={e => updateEducation(i, 'degree', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">{t.education.field}</label>
              <input className="form-control" value={edu.field || ''} placeholder="Computer Science"
                onChange={e => updateEducation(i, 'field', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">{t.education.gpa}</label>
              <input className="form-control" value={edu.gpa || ''} placeholder="3.8"
                onChange={e => updateEducation(i, 'gpa', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label className="form-label">{t.education.startDate}</label>
              <input className="form-control" value={edu.startDate || ''} placeholder="Sep 2020"
                onChange={e => updateEducation(i, 'startDate', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">{t.education.endDate}</label>
              <input className="form-control" value={edu.endDate || ''} placeholder="May 2024"
                onChange={e => updateEducation(i, 'endDate', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-ghost" onClick={addEducation} style={{ width: '100%' }}>
        {t.education.addEducation}
      </button>
    </div>
  )
}
