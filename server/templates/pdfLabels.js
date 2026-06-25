/**
 * pdfLabels.js
 * Shared localised section-heading strings used by every PDF template.
 */
const PDF_LABELS = {
  en: { experience: 'Experience',      education: 'Education',  skills: 'Skills',       projects: 'Projects',  present: 'Present', tech: 'Tech', gpa: 'GPA'     },
  fr: { experience: 'Expérience',      education: 'Formation',  skills: 'Compétences',  projects: 'Projets',   present: 'Présent', tech: 'Tech', gpa: 'Moyenne'  },
  ar: { experience: 'الخبرة العملية', education: 'التعليم',   skills: 'المهارات',     projects: 'المشاريع', present: 'حتى الآن', tech: 'التقنيات', gpa: 'المعدل' },
  es: { experience: 'Experiencia',     education: 'Educación',  skills: 'Habilidades',  projects: 'Proyectos', present: 'Presente', tech: 'Tech', gpa: 'Promedio' },
};

function getLabels(lang) {
  return PDF_LABELS[lang] || PDF_LABELS['en'];
}

module.exports = { PDF_LABELS, getLabels };
