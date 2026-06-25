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
    { key: 'personal',   label: t.tabs.personal,   icon: 'person' },
    { key: 'experience', label: t.tabs.experience, icon: 'work' },
    { key: 'education',  label: t.tabs.education,  icon: 'school' },
    { key: 'skills',     label: t.tabs.skills,     icon: 'construction' },
    { key: 'projects',   label: t.tabs.projects,   icon: 'folder_special' },
  ]

  return (
    <div>
      {/* Tab bar */}
      <div className="resume-section-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={active === tab.key ? 'active' : ''}
          >
            <span className="material-symbols-outlined">{tab.icon}</span>
            <span>{tab.label.replace(/^[^\p{L}\p{N}]+/u, '')}</span>
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
