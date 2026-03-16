module.exports = function buildHtml(r) {
  const p  = r.personalInfo || {};
  const ed = r.education    || [];
  const ex = r.experience   || [];
  const sk = r.skills       || [];
  const pr = r.projects     || [];

  const contactItems = [
    p.email    ? `<span>✉ ${p.email}</span>`    : '',
    p.phone    ? `<span>📞 ${p.phone}</span>`    : '',
    p.location ? `<span>📍 ${p.location}</span>` : '',
    p.website  ? `<a href="${p.website}">🌐 ${p.website}</a>` : '',
    p.linkedin ? `<a href="${p.linkedin}">💼 LinkedIn</a>`    : '',
  ].filter(Boolean).join('<span class="sep">|</span>');

  const eduHtml = ed.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <span class="entry-title">${e.degree}${e.field ? ' in ' + e.field : ''}</span>
          <span class="entry-sub"> — ${e.institution}</span>
        </div>
        <span class="date">${e.startDate}${e.endDate ? ' – ' + e.endDate : ''}</span>
      </div>
      ${e.gpa ? `<div class="entry-detail">GPA: ${e.gpa}</div>` : ''}
    </div>`).join('');

  const expHtml = ex.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <span class="entry-title">${e.role}</span>
          <span class="entry-sub"> — ${e.company}${e.location ? ', ' + e.location : ''}</span>
        </div>
        <span class="date">${e.startDate} – ${e.current ? 'Present' : (e.endDate || '')}</span>
      </div>
      ${e.bullets && e.bullets.length
        ? `<ul class="bullets">${e.bullets.filter(b => b.trim()).map(b => `<li>${b}</li>`).join('')}</ul>`
        : ''}
    </div>`).join('');

  const projHtml = pr.map(proj => `
    <div class="entry">
      <div class="entry-header">
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
    color: #2563eb;
    border-bottom: 1px solid #d1d5db;
    padding-bottom: 3px;
    margin-bottom: 8px;
  }
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
  }
</style>
</head>
<body>
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
    <div class="section-title">Experience</div>
    ${expHtml}
  </div>` : ''}

  <!-- EDUCATION -->
  ${eduHtml ? `
  <div class="section">
    <div class="section-title">Education</div>
    ${eduHtml}
  </div>` : ''}

  <!-- SKILLS -->
  ${skillGroups ? `
  <div class="section">
    <div class="section-title">Skills</div>
    ${skillGroups}
  </div>` : ''}

  <!-- PROJECTS -->
  ${projHtml ? `
  <div class="section">
    <div class="section-title">Projects</div>
    ${projHtml}
  </div>` : ''}
</body>
</html>`;
};
