/**
 * executive.js  —  Premium single-column layout.
 * Deep charcoal header, gold accent lines, generous whitespace.
 * Best for senior / leadership roles.
 */
const { getLabels } = require('./pdfLabels');

module.exports = function executiveTemplate(r) {
  const lang   = r.lang || 'en';
  const labels = getLabels(lang);
  const isRTL  = lang === 'ar';
  const dir    = isRTL ? 'rtl' : 'ltr';

  const p  = r.personalInfo || {};
  const ed = r.education    || [];
  const ex = r.experience   || [];
  const sk = r.skills       || [];
  const pr = r.projects     || [];

  const contact = [p.email, p.phone, p.location, p.website, p.linkedin]
    .filter(Boolean)
    .map((c,i) => i > 0 ? `<span class="sep">|</span>${c}` : c)
    .join('');

  const expHtml = ex.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <span class="entry-title">${e.role||''}</span>
          ${e.company?`<span class="entry-company"> · ${e.company}${e.location?', '+e.location:''}</span>`:''}
        </div>
        <span class="entry-date">${e.startDate||''}${e.startDate?' – ':''}${e.current?labels.present:(e.endDate||'')}</span>
      </div>
      ${(e.bullets||[]).filter(b=>b.trim()).length
        ?`<ul class="bullets">${e.bullets.filter(b=>b.trim()).map(b=>`<li>${b}</li>`).join('')}</ul>`:''
      }
    </div>`).join('');

  const eduHtml = ed.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <span class="entry-title">${[e.degree,e.field].filter(Boolean).join(' in ')||''}</span>
          ${e.institution?`<span class="entry-company"> · ${e.institution}</span>`:''}
        </div>
        <span class="entry-date">${e.startDate||''}${e.endDate?' – '+e.endDate:''}</span>
      </div>
      ${e.gpa?`<div class="detail">${labels.gpa}: ${e.gpa}</div>`:''}
    </div>`).join('');

  const projHtml = pr.map(proj => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${proj.name||''}</span>
        ${proj.link?`<a class="entry-date" href="${proj.link}">${proj.link}</a>`:''}
      </div>
      ${proj.technologies?`<div class="detail"><em>${labels.tech}:</em> ${proj.technologies}</div>`:''}
      ${proj.description?`<div class="detail">${proj.description}</div>`:''}
    </div>`).join('');

  const skillsHtml = sk.map(s=>`<span class="skill-tag">${s}</span>`).join('');

  return `<!DOCTYPE html><html lang="${lang}" dir="${dir}"><head><meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${isRTL?"'Cairo',Tahoma,Arial":"'Segoe UI',Arial"},sans-serif;font-size:11.5px;color:#1c1c1c;line-height:1.55;background:#fff;direction:${dir}}
a{color:#b7860b;text-decoration:none}
.page{padding:0}

/* Header band */
.header{background:#1c1c2e;color:#fff;padding:28px 32px 22px;position:relative}
.header::after{content:'';display:block;height:4px;background:linear-gradient(90deg,#b7860b,#f0c040,#b7860b);margin-top:18px;margin-${isRTL?'right':'left'}:-32px;margin-${isRTL?'left':'right'}:-32px}
.name{font-size:26px;font-weight:700;letter-spacing:1px;color:#fff;margin-bottom:3px}
.tagline{font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#b7860b;margin-bottom:10px}
.contact{font-size:9.5px;color:#aaa}.sep{margin:0 6px;color:#555}

/* Body */
.body{padding:22px 32px}
.summary{font-size:11px;color:#374151;line-height:1.7;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #e5e7eb}

.section{margin-bottom:18px}
.section-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#b7860b;display:flex;align-items:center;gap:8px;margin-bottom:10px}
.section-title::after{content:'';flex:1;height:1px;background:#e5e7eb}

.entry{margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f3f4f6}
.entry:last-child{border-bottom:none;padding-bottom:0}
.entry-header{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap}
.entry-title{font-weight:700;font-size:12px;color:#111}
.entry-company{font-size:10.5px;color:#6b7280}
.entry-date{font-size:9.5px;color:#b7860b;white-space:nowrap;font-weight:600;flex-shrink:0}
.bullets{margin:5px 0 0 ${isRTL?'0':'16px'};${isRTL?'margin-right:16px;':''}padding:0}
.bullets li{font-size:10.5px;color:#374151;margin-bottom:2px;line-height:1.45}
.detail{font-size:10px;color:#6b7280;margin-top:2px}

.skills-wrap{display:flex;flex-wrap:wrap;gap:5px}
.skill-tag{background:#fefce8;color:#92400e;border:1px solid #fde68a;padding:2px 10px;border-radius:3px;font-size:9.5px;font-weight:600}
</style></head><body><div class="page">

<div class="header">
  <div class="name">${p.name||'Your Name'}</div>
  ${ex[0]?.role?`<div class="tagline">${ex[0].role}</div>`:''}
  ${contact?`<div class="contact">${contact}</div>`:''}
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
    <div class="section-title">${labels.projects}</div>${projHtml}
  </div>`:''}
</div>

</div></body></html>`;
};
