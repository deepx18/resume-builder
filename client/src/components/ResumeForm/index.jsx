import { useState } from 'react'
import PersonalInfo   from './PersonalInfo'
import EducationSection from './EducationSection'
import ExperienceSection from './ExperienceSection'
import SkillsSection   from './SkillsSection'
import ProjectsSection from './ProjectsSection'

const TABS = [
  { key: 'personal',    label: '👤 Personal'   },
  { key: 'experience',  label: '💼 Experience'  },
  { key: 'education',   label: '🎓 Education'   },
  { key: 'skills',      label: '🛠 Skills'       },
  { key: 'projects',    label: '🚀 Projects'    },
]

export default function ResumeForm() {
  const [active, setActive] = useState('personal')

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
        marginBottom: 20,
        background: 'var(--bg-white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 4,
      }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              flex: 1,
              padding: '7px 8px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              background: active === t.key ? 'var(--primary)' : 'transparent',
              color:      active === t.key ? '#fff' : 'var(--text-muted)',
              transition: 'all .15s',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Active section */}
      {active === 'personal'   && <PersonalInfo />}
      {active === 'experience' && <ExperienceSection />}
      {active === 'education'  && <EducationSection />}
      {active === 'skills'     && <SkillsSection />}
      {active === 'projects'   && <ProjectsSection />}
    </div>
  )
}
