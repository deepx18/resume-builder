import { useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import PersonalInfo      from './PersonalInfo'
import EducationSection  from './EducationSection'
import ExperienceSection from './ExperienceSection'
import SkillsSection     from './SkillsSection'
import ProjectsSection   from './ProjectsSection'

export default function ResumeForm() {
  const { t } = useLang()
  const [active, setActive] = useState('personal')

  const TABS = [
    { key: 'personal',   label: t.tabs.personal   },
    { key: 'experience', label: t.tabs.experience  },
    { key: 'education',  label: t.tabs.education   },
    { key: 'skills',     label: t.tabs.skills      },
    { key: 'projects',   label: t.tabs.projects    },
  ]

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
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            style={{
              flex: 1,
              padding: '7px 8px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              background: active === tab.key ? 'var(--primary)' : 'transparent',
              color:      active === tab.key ? '#fff' : 'var(--text-muted)',
              transition: 'all .15s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'personal'   && <PersonalInfo />}
      {active === 'experience' && <ExperienceSection />}
      {active === 'education'  && <EducationSection />}
      {active === 'skills'     && <SkillsSection />}
      {active === 'projects'   && <ProjectsSection />}
    </div>
  )
}
