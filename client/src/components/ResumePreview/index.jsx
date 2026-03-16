import { useResume } from '../../context/ResumeContext'

const sectionTitle = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#2563eb',
  borderBottom: '1px solid #d1d5db',
  paddingBottom: 3,
  marginBottom: 10,
  marginTop: 16,
}

const entryTitle  = { fontWeight: 600, fontSize: 12, color: '#111' }
const entryMeta   = { fontSize: 11, color: '#555' }
const dateStyle   = { fontSize: 10.5, color: '#888', marginLeft: 'auto', whiteSpace: 'nowrap' }

export default function ResumePreview() {
  const { resume: r } = useResume()
  const p  = r.personalInfo || {}
  const ed = r.education    || []
  const ex = r.experience   || []
  const sk = r.skills       || []
  const pr = r.projects     || []

  const contactParts = [p.email, p.phone, p.location, p.website, p.linkedin].filter(Boolean)

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: 12, lineHeight: 1.55, color: '#1a1a1a' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', paddingBottom: 12, borderBottom: '2px solid #2563eb', marginBottom: 14 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#111' }}>
          {p.name || <span style={{ color: '#9ca3af' }}>Your Name</span>}
        </h1>
        {contactParts.length > 0 && (
          <div style={{ fontSize: 10.5, color: '#555', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 6px' }}>
            {contactParts.map((c, i) => (
              <span key={i}>
                {i > 0 && <span style={{ color: '#ccc', margin: '0 4px' }}>|</span>}
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {p.summary && (
        <p style={{ fontSize: 11, color: '#444', lineHeight: 1.6, marginBottom: 8 }}>{p.summary}</p>
      )}

      {/* Experience */}
      {ex.length > 0 && (
        <div>
          <div style={sectionTitle}>Experience</div>
          {ex.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 4 }}>
                <div>
                  <span style={entryTitle}>{e.role || <em style={{ color: '#9ca3af' }}>Role</em>}</span>
                  {e.company && <span style={entryMeta}> — {e.company}{e.location ? `, ${e.location}` : ''}</span>}
                </div>
                <span style={dateStyle}>
                  {e.startDate}{e.startDate && ' – '}{e.current ? 'Present' : e.endDate}
                </span>
              </div>
              {(e.bullets || []).filter(b => b.trim()).length > 0 && (
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  {e.bullets.filter(b => b.trim()).map((b, j) => (
                    <li key={j} style={{ fontSize: 11, color: '#333', marginBottom: 2 }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {ed.length > 0 && (
        <div>
          <div style={sectionTitle}>Education</div>
          {ed.map((e, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 4 }}>
                <div>
                  <span style={entryTitle}>
                    {[e.degree, e.field].filter(Boolean).join(' in ') || <em style={{ color: '#9ca3af' }}>Degree</em>}
                  </span>
                  {e.institution && <span style={entryMeta}> — {e.institution}</span>}
                </div>
                <span style={dateStyle}>
                  {e.startDate}{e.startDate && ' – '}{e.endDate}
                </span>
              </div>
              {e.gpa && <div style={{ fontSize: 10.5, color: '#555', marginTop: 1 }}>GPA: {e.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {sk.length > 0 && (
        <div>
          <div style={sectionTitle}>Skills</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {sk.map((s, i) => (
              <span key={i} style={{
                background: '#eff6ff', color: '#1d4ed8',
                border: '1px solid #bfdbfe',
                padding: '2px 8px', borderRadius: 12,
                fontSize: 10.5, fontWeight: 500,
              }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {pr.length > 0 && (
        <div>
          <div style={sectionTitle}>Projects</div>
          {pr.map((proj, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={entryTitle}>{proj.name || <em style={{ color: '#9ca3af' }}>Project name</em>}</span>
                {proj.link && <a href={proj.link} style={{ fontSize: 10.5, color: '#2563eb' }}>View →</a>}
              </div>
              {proj.technologies && (
                <div style={{ fontSize: 10.5, color: '#555', marginTop: 1 }}>
                  <strong>Tech:</strong> {proj.technologies}
                </div>
              )}
              {proj.description && (
                <p style={{ fontSize: 11, color: '#444', margin: '3px 0 0' }}>{proj.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!p.name && ex.length === 0 && ed.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
          <div style={{ fontSize: 13 }}>Your resume preview will appear here</div>
          <div style={{ fontSize: 11, marginTop: 4 }}>Start filling in the form on the left</div>
        </div>
      )}
    </div>
  )
}
