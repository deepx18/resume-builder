/**
 * creative.js  —  Bold teal left accent bar, coral highlights.
 * Two-column feel but single HTML flow. Great for designers & developers.
 */
const { getLabels } = require('./pdfLabels');

module.exports = function creativeTemplate(r) {
  const lang   = r.lang || 'en';
  const labels = getLabels(lang);
  const isRTL  = lang === 'ar';
  const dir    = isRTL ? 'rtl' : 'ltr';

  const p  = r.personalInfo || {};
  const ed = r.education    || [];
  const ex = r.experience   || [];
  const sk = r.skills       || [];
  const pr = r.projects     || [];

  const contact = [
    p.email    ? `<span class="ci">✉ ${p.email}</span>`    : '',
    p.phone    ? `<span class="ci">📞 ${p.phone}</span>`    : '',
    p.location ? `<span class="ci">📍 ${p.location}</span>` : '',
    p.website  ? `<span class="ci">🌐 ${p.website}</span>`  : '',
    p.linkedin ? `<span class="ci">💼 ${p.linkedin}</span>` : '',
  ].filter(Boolean).join('');

  const expHtml = ex.map(e => `
    <div class="entry">
      <div class="entry-dot"></div>
      <div class="entry-body">
        <div class="entry-header">
          <div>
            <span class="entry-title">${e.role||''}</span>
            ${e.company?`<span class="entry-company"> @ ${e.company}${e.location?', '+e.location:''}</span>`:''}
          </div>
          <span class="entry-date">${e.startDate||''}${e.startDate?' – ':''}${e.current?labels.present:(e.endDate||'')}</span>
        </div>
        ${(e.bullets||[]).filter(b=>b.trim()).length
          ?`<ul class="bullets">${e.bullets.filter(b=>b.trim()).map(b=>`<li>${b}</li>`).join('')}</ul>`:''
        }
      </div>
    </div>`).join('');

  const eduHtml = ed.map(e => `
    <div class="entry">
      <div class="entry-dot"></div>
      <div class="entry-body">
        <div class="entry-header">
          <div>
            <span class="entry-title">${[e.degree,e.field].filter(Boolean).join(' in ')||''}</span>
            ${e.institution?`<span class="entry-company"> @ ${e.institution}</span>`:''}
          </div>
          <span class="entry-date">${e.startDate||''}${e.endDate?' – '+e.endDate:''}</span>
        </div>
        ${e.gpa?`<div class="small">${labels.gpa}: ${e.gpa}</div>`:''}
      </div>
    </div>`).join('');

  const projHtml = pr.map(proj => `
    <div class="proj-card">
      <div class="proj-name">${proj.name||''} ${proj.link?`<a href="${proj.link}" class="proj-link">↗</a>`:''}</div>
      ${proj.technologies?`<div class="proj-tech">${proj.technologies}</div>`:''}
      ${proj.description?`<div class="proj-desc">${proj.description}</div>`:''}
    </div>`).join('');

  const skillsHtml = sk.map(s=>`<span class="skill-tag">${s}</span>`).join('');

  return `<!DOCTYPE html><html lang="${lang}" dir="${dir}"><head><meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${isRTL?"'Cairo',Tahoma,Arial":"'Segoe UI',system-ui,Arial"},sans-serif;font-size:11.5px;color:#1f2937;line-height:1.55;background:#fff;direction:${dir}}
a{color:#0d9488;text-decoration:none}
.page{padding:0}

/* Header */
.header{background:#0f172a;padding:26px 28px 20px;border-bottom:5px solid #0d9488}
.name{font-size:24px;font-weight:800;color:#fff;letter-spacing:.5px;margin-bottom:4px}
.contact-row{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:8px}
.ci{font-size:9.5px;color:#94a3b8}

/* Body */
.body{padding:20px 28px}
.summary{font-size:11px;color:#374151;line-height:1.7;background:#f0fdfa;border-left:3px solid #0d9488;padding:10px 14px;margin-bottom:20px;border-radius:0 4px 4px 0}
html[dir="rtl"] .summary{border-left:none;border-right:3px solid #0d9488;border-radius:4px 0 0 4px}

/* Section */
.section{margin-bottom:18px}
.section-title{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:#0d9488;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.section-title::after{content:'';flex:1;height:2px;background:#ccfbf1}

/* Timeline entries */
.entry{display:flex;gap:10px;margin-bottom:10px;position:relative}
.entry-dot{width:8px;height:8px;border-radius:50%;background:#0d9488;flex-shrink:0;margin-top:4px}
.entry-body{flex:1}
.entry-header{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap}
.entry-title{font-weight:700;font-size:12px;color:#0f172a}
.entry-company{font-size:10.5px;color:#f97316;font-weight:600}
.entry-date{font-size:9px;color:#9ca3af;white-space:nowrap;background:#f3f4f6;padding:1px 6px;border-radius:10px}
.bullets{margin:5px 0 0 0;padding:0 0 0 14px}
.bullets li{font-size:10.5px;color:#374151;margin-bottom:2px;line-height:1.45}
.small{font-size:10px;color:#6b7280;margin-top:2px}

/* Project cards */
.proj-grid{display:flex;flex-wrap:wrap;gap:10px}
.proj-card{flex:1;min-width:180px;background:#fafafa;border:1px solid #e5e7eb;border-top:3px solid #f97316;border-radius:4px;padding:10px 12px}
.proj-name{font-weight:700;font-size:11px;color:#0f172a;margin-bottom:3px}
.proj-link{color:#0d9488;font-size:11px;margin-left:4px}
.proj-tech{font-size:9.5px;color:#f97316;font-weight:600;margin-bottom:4px}
.proj-desc{font-size:10px;color:#6b7280;line-height:1.45}

/* Skills */
.skills-wrap{display:flex;flex-wrap:wrap;gap:5px}
.skill-tag{background:#ecfdf5;color:#065f46;border:1px solid #6ee7b7;padding:3px 10px;border-radius:20px;font-size:9.5px;font-weight:600}
</style></head><body><div class="page">

<div class="header">
  <div class="name">${p.name||'Your Name'}</div>
  <div class="contact-row">${contact}</div>
</div>

<div class="body">
  ${p.summary?`<div class="summary">${p.summary}</div>`:''}

  ${expHtml?`<div class="section">
    <div class="section-title">${labels.experience}</div>${expHtml}
  </div>`:''}

  ${eduHtml?`<div class="section">
    <div class="section-title">${labels.education}</div>${eduHtml}
  </div>`:''}

  ${skillsHtml?`<div class="section">
    <div class="section-title">${labels.skills}</div>
    <div class="skills-wrap">${skillsHtml}</div>
  </div>`:''}

  ${projHtml?`<div class="section">
    <div class="section-title">${labels.projects}</div>
    <div class="proj-grid">${projHtml}</div>
  </div>`:''}
</div>

</div></body></html>`;
};
