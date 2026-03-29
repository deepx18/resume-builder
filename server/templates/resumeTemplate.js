<<<<<<< HEAD
/**
 * resumeTemplate.js
 *
 * Accepts an optional `lang` field on the resume object so the exported PDF
 * section headings match the language chosen in the UI.
 *
 * Supported: en (default), fr, ar, es
 */

const PDF_LABELS = {
  en: { experience: 'Experience', education: 'Education', skills: 'Skills',      projects: 'Projects', present: 'Present', tech: 'Tech', gpa: 'GPA' },
  fr: { experience: 'Expérience', education: 'Formation',  skills: 'Compétences', projects: 'Projets',  present: 'Présent', tech: 'Tech', gpa: 'Moyenne' },
  ar: { experience: 'الخبرة العملية', education: 'التعليم', skills: 'المهارات', projects: 'المشاريع', present: 'حتى الآن', tech: 'التقنيات', gpa: 'المعدل' },
  es: { experience: 'Experiencia',  education: 'Educación', skills: 'Habilidades', projects: 'Proyectos', present: 'Presente', tech: 'Tech', gpa: 'Promedio' },
};

module.exports = function buildHtml(r) {
  const lang   = r.lang && PDF_LABELS[r.lang] ? r.lang : 'en';
  const labels = PDF_LABELS[lang];
  const isRTL  = lang === 'ar';
  const dir    = isRTL ? 'rtl' : 'ltr';

=======
module.exports = function buildHtml(r) {
>>>>>>> 1b585c7 (Ready, Set, Go!)
  const p  = r.personalInfo || {};
  const ed = r.education    || [];
  const ex = r.experience   || [];
  const sk = r.skills       || [];
  const pr = r.projects     || [];

  const contactItems = [
<<<<<<< HEAD
    p.email    ? `<span>${p.email}</span>`    : '',
    p.phone    ? `<span>${p.phone}</span>`    : '',
    p.location ? `<span>${p.location}</span>` : '',
    p.website  ? `<span>${p.website}</span>`  : '',
    p.linkedin ? `<span>${p.linkedin}</span>` : '',
=======
    p.email    ? `<span>✉ ${p.email}</span>`    : '',
    p.phone    ? `<span>📞 ${p.phone}</span>`    : '',
    p.location ? `<span>📍 ${p.location}</span>` : '',
    p.website  ? `<a href="${p.website}">🌐 ${p.website}</a>` : '',
    p.linkedin ? `<a href="${p.linkedin}">💼 LinkedIn</a>`    : '',
>>>>>>> 1b585c7 (Ready, Set, Go!)
  ].filter(Boolean).join('<span class="sep">|</span>');

  const eduHtml = ed.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div>
<<<<<<< HEAD
          <span class="entry-title">${e.degree || ''}${e.field ? ' in ' + e.field : ''}</span>
          ${e.institution ? `<span class="entry-sub"> &mdash; ${e.institution}</span>` : ''}
        </div>
        <span class="date">${e.startDate || ''}${e.endDate ? ' &ndash; ' + e.endDate : ''}</span>
      </div>
      ${e.gpa ? `<div class="entry-detail">${labels.gpa}: ${e.gpa}</div>` : ''}
=======
          <span class="entry-title">${e.degree}${e.field ? ' in ' + e.field : ''}</span>
          <span class="entry-sub"> — ${e.institution}</span>
        </div>
        <span class="date">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}</span>
      </div>
      ${e.gpa ? `<div class="entry-detail">GPA: ${e.gpa}</div>` : ''}
>>>>>>> 1b585c7 (Ready, Set, Go!)
    </div>`).join('');

  const expHtml = ex.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div>
<<<<<<< HEAD
          <span class="entry-title">${e.role || ''}</span>
          ${e.company ? `<span class="entry-sub"> &mdash; ${e.company}${e.location ? ', ' + e.location : ''}</span>` : ''}
        </div>
        <span class="date">${e.startDate || ''}${e.startDate ? ' &ndash; ' : ''}${e.current ? labels.present : (e.endDate || '')}</span>
      </div>
      ${(e.bullets || []).filter(b => b && b.trim()).length > 0
        ? `<ul class="bullets">${e.bullets.filter(b => b && b.trim()).map(b => `<li>${b}</li>`).join('')}</ul>`
=======
          <span class="entry-title">${e.role}</span>
          <span class="entry-sub"> — ${e.company}${e.location ? ', ' + e.location : ''}</span>
        </div>
        <span class="date">${e.startDate} – ${e.current ? 'Present' : (e.endDate || '')}</span>
      </div>
      ${e.bullets && e.bullets.length
        ? `<ul class="bullets">${e.bullets.filter(b => b.trim()).map(b => `<li>${b}</li>`).join('')}</ul>`
>>>>>>> 1b585c7 (Ready, Set, Go!)
        : ''}
    </div>`).join('');

  const projHtml = pr.map(proj => `
    <div class="entry">
      <div class="entry-header">
<<<<<<< HEAD
        <span class="entry-title">${proj.name || ''}</span>
        ${proj.link ? `<span class="date"><a href="${proj.link}">${proj.link}</a></span>` : ''}
      </div>
      ${proj.technologies ? `<div class="entry-detail"><strong>${labels.tech}:</strong> ${proj.technologies}</div>` : ''}
      ${proj.description  ? `<div class="entry-detail">${proj.description}</div>` : ''}
    </div>`).join('');

  const skillsHtml = sk.length
    ? sk.map(s => `<span class="skill-tag">${s}</span>`).join('')
    : '';

  const arabicFont = isRTL
    ? `@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');`
    : '';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  ${arabicFont}
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: ${isRTL
      ? "'Cairo', 'Segoe UI', Tahoma, Arial, sans-serif"
      : "Arial, Helvetica, sans-serif"};
    font-size: 12px;
    color: #1a1a1a;
    line-height: 1.55;
    background: #ffffff;
    direction: ${dir};
  }

  a { color: #2563eb; text-decoration: none; }

  .page { width: 100%; padding: 20px 24px; }

  /* ── Header ── */
  .header {
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #2563eb;
    margin-bottom: 12px;
  }
  .header h1 {
    font-size: 22px;
    font-weight: 700;
    color: #111111;
    margin-bottom: 5px;
  }
  .contact { font-size: 10px; color: #555555; }
  .contact .sep { margin: 0 6px; color: #cccccc; }

  /* ── Summary ── */
  .summary {
    font-size: 11px;
    color: #444444;
    margin-bottom: 12px;
    line-height: 1.6;
  }

  /* ── Section ── */
  .section { margin-bottom: 12px; }
  .section-title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
=======
        <span class="entry-title">${proj.name}</span>
        ${proj.link ? `<a href="${proj.link}" class="date">View Project</a>` : ''}
      </div>
      ${proj.technologies ? `<div class="entry-detail tech"><strong>Tech:</strong> ${proj.technologies}</div>` : ''}
      ${proj.description  ? `<p class="entry-detail">${proj.description}</p>` : ''}
    </div>`).join('');

  const skillGroups = sk.length
    ? `<div class="skills-grid">${sk.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 11.5px;
    color: #1a1a1a;
    line-height: 1.5;
    background: #fff;
  }
  a { color: #2563eb; text-decoration: none; }
  /* Header */
  .header {
    text-align: center;
    padding-bottom: 12px;
    border-bottom: 2px solid #2563eb;
    margin-bottom: 14px;
  }
  .header h1 {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #111;
    margin-bottom: 5px;
  }
  .contact {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px 0;
    font-size: 10.5px;
    color: #555;
  }
  .contact span, .contact a { color: #444; }
  .sep { margin: 0 8px; color: #bbb; }
  /* Summary */
  .summary {
    font-size: 11px;
    color: #444;
    margin-bottom: 14px;
    line-height: 1.6;
  }
  /* Section */
  .section { margin-bottom: 14px; }
  .section-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
>>>>>>> 1b585c7 (Ready, Set, Go!)
    color: #2563eb;
    border-bottom: 1px solid #d1d5db;
    padding-bottom: 3px;
    margin-bottom: 8px;
  }
<<<<<<< HEAD

  /* ── Entry ── */
  .entry { margin-bottom: 8px; }
  .entry-header {
    display: table;
    width: 100%;
  }
  .entry-header > div,
  .entry-header > span.entry-title {
    display: table-cell;
  }
  .entry-header .date {
    display: table-cell;
    text-align: ${isRTL ? 'left' : 'right'};
    white-space: nowrap;
    font-size: 10px;
    color: #888888;
    vertical-align: top;
    padding-${isRTL ? 'right' : 'left'}: 8px;
    width: 1%;
  }
  .entry-title { font-weight: 700; font-size: 11.5px; color: #111111; }
  .entry-sub   { font-size: 11px; color: #555555; font-weight: normal; }
  .entry-detail { font-size: 10.5px; color: #555555; margin-top: 2px; }

  /* ── Bullets ── */
  .bullets {
    margin: 4px 0 0 ${isRTL ? '0' : '16px'};
    ${isRTL ? 'margin-right: 16px;' : ''}
    padding: 0;
    list-style-position: ${isRTL ? 'inside' : 'outside'};
  }
  .bullets li { font-size: 11px; color: #333333; margin-bottom: 2px; }

  /* ── Skills ── */
  .skills-wrap { display: block; line-height: 2; }
  .skill-tag {
    display: inline-block;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    padding: 1px 8px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 600;
    margin: 2px 3px 2px 0;
=======
  /* Entry */
  .entry { margin-bottom: 8px; }
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
  }
  .entry-title {
    font-weight: 600;
    font-size: 11.5px;
    color: #111;
  }
  .entry-sub { color: #555; font-size: 11px; }
  .date {
    font-size: 10.5px;
    color: #888;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .entry-detail {
    font-size: 10.5px;
    color: #555;
    margin-top: 2px;
  }
  .tech { font-size: 10.5px; }
  /* Bullets */
  .bullets {
    margin: 4px 0 0 16px;
    padding: 0;
  }
  .bullets li {
    margin-bottom: 2px;
    font-size: 11px;
    color: #333;
  }
  /* Skills */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .skill-tag {
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 10.5px;
    font-weight: 500;
>>>>>>> 1b585c7 (Ready, Set, Go!)
  }
</style>
</head>
<body>
<<<<<<< HEAD
<div class="page">

=======
>>>>>>> 1b585c7 (Ready, Set, Go!)
  <!-- HEADER -->
  <div class="header">
    <h1>${p.name || 'Your Name'}</h1>
    ${contactItems ? `<div class="contact">${contactItems}</div>` : ''}
  </div>

  <!-- SUMMARY -->
  ${p.summary ? `<div class="summary">${p.summary}</div>` : ''}

  <!-- EXPERIENCE -->
  ${expHtml ? `
  <div class="section">
<<<<<<< HEAD
    <div class="section-title">${labels.experience}</div>
=======
    <div class="section-title">Experience</div>
>>>>>>> 1b585c7 (Ready, Set, Go!)
    ${expHtml}
  </div>` : ''}

  <!-- EDUCATION -->
  ${eduHtml ? `
  <div class="section">
<<<<<<< HEAD
    <div class="section-title">${labels.education}</div>
=======
    <div class="section-title">Education</div>
>>>>>>> 1b585c7 (Ready, Set, Go!)
    ${eduHtml}
  </div>` : ''}

  <!-- SKILLS -->
<<<<<<< HEAD
  ${skillsHtml ? `
  <div class="section">
    <div class="section-title">${labels.skills}</div>
    <div class="skills-wrap">${skillsHtml}</div>
=======
  ${skillGroups ? `
  <div class="section">
    <div class="section-title">Skills</div>
    ${skillGroups}
>>>>>>> 1b585c7 (Ready, Set, Go!)
  </div>` : ''}

  <!-- PROJECTS -->
  ${projHtml ? `
  <div class="section">
<<<<<<< HEAD
    <div class="section-title">${labels.projects}</div>
    ${projHtml}
  </div>` : ''}

</div>
=======
    <div class="section-title">Projects</div>
    ${projHtml}
  </div>` : ''}
>>>>>>> 1b585c7 (Ready, Set, Go!)
</body>
</html>`;
};
