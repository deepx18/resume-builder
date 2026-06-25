/**
 * modern.js  —  Two-column layout: dark navy sidebar + white content area.
 * Skills, contact info in the sidebar; experience/education on the right.
 */
const { getLabels } = require('./pdfLabels');

module.exports = function modernTemplate(r) {
  const lang   = r.lang || 'en';
  const labels = getLabels(lang);
  const isRTL  = lang === 'ar';
  const dir    = isRTL ? 'rtl' : 'ltr';

  const p  = r.personalInfo || {};
  const ed = r.education    || [];
  const ex = r.experience   || [];
  const sk = r.skills       || [];
  const pr = r.projects     || [];

  // Sidebar: contact + skills + education (fits neatly on left)
  const contactHtml = [
    p.email    ? `<div class="contact-item">✉ ${p.email}</div>`    : '',
    p.phone    ? `<div class="contact-item">📞 ${p.phone}</div>`    : '',
    p.location ? `<div class="contact-item">📍 ${p.location}</div>` : '',
    p.website  ? `<div class="contact-item">🌐 ${p.website}</div>`  : '',
    p.linkedin ? `<div class="contact-item">💼 ${p.linkedin}</div>` : '',
  ].filter(Boolean).join('');

  const skillsHtml = sk.map(s => `<span class="skill-pill">${s}</span>`).join('');

  const sideEduHtml = ed.map(e => `
    <div class="side-entry">
      <div class="side-entry-title">${[e.degree,e.field].filter(Boolean).join(' in ')||''}</div>
      ${e.institution?`<div class="side-entry-sub">${e.institution}</div>`:''}
      <div class="side-entry-date">${e.startDate||''}${e.endDate?' – '+e.endDate:''}</div>
      ${e.gpa?`<div class="side-entry-date">${labels.gpa}: ${e.gpa}</div>`:''}
    </div>`).join('');

  // Main: experience + projects
  const expHtml = ex.map(e => `
    <div class="entry">
      <div class="entry-header">
        <div class="entry-left">
          <span class="entry-title">${e.role||''}</span>
          ${e.company?`<span class="entry-company"> · ${e.company}${e.location?', '+e.location:''}</span>`:''}
        </div>
        <span class="entry-date">${e.startDate||''}${e.startDate?' – ':''}${e.current?labels.present:(e.endDate||'')}</span>
      </div>
      ${(e.bullets||[]).filter(b=>b.trim()).length
        ?`<ul class="bullets">${e.bullets.filter(b=>b.trim()).map(b=>`<li>${b}</li>`).join('')}</ul>`:''
      }
    </div>`).join('');

  const projHtml = pr.map(proj => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${proj.name||''}</span>
        ${proj.link?`<a class="entry-date link" href="${proj.link}">${proj.link}</a>`:''}
      </div>
      ${proj.technologies?`<div class="proj-tech"><strong>${labels.tech}:</strong> ${proj.technologies}</div>`:''}
      ${proj.description?`<div class="proj-desc">${proj.description}</div>`:''}
    </div>`).join('');

  return `<!DOCTYPE html><html lang="${lang}" dir="${dir}"><head><meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${isRTL?"'Cairo',Tahoma,Arial":"'Segoe UI',Arial"},sans-serif;font-size:11.5px;color:#1a1a1a;direction:${dir};background:#fff}
a{color:#93c5fd;text-decoration:none}
.wrapper{display:flex;min-height:100vh;direction:${dir}}
.sidebar{width:210px;flex-shrink:0;background:#1e3a5f;color:#e2e8f0;padding:24px 16px;${isRTL?'border-radius:0 0 0 0':''};}
.main{flex:1;padding:28px 24px;background:#fff}

/* Sidebar */
.sb-name{font-size:18px;font-weight:700;color:#fff;margin-bottom:4px;line-height:1.2}
.sb-role{font-size:10px;color:#93c5fd;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px}
.sb-section{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#93c5fd;border-bottom:1px solid rgba(255,255,255,.15);padding-bottom:4px;margin:16px 0 8px}
.contact-item{font-size:9.5px;color:#cbd5e1;margin-bottom:5px;word-break:break-all;line-height:1.4}
.skill-pill{display:inline-block;background:rgba(255,255,255,.12);color:#e2e8f0;border-radius:20px;padding:2px 9px;font-size:9px;margin:2px 3px 2px 0}
.side-entry{margin-bottom:10px}
.side-entry-title{font-size:10px;font-weight:600;color:#f1f5f9;line-height:1.3}
.side-entry-sub{font-size:9px;color:#94a3b8;margin-top:1px}
.side-entry-date{font-size:9px;color:#64748b;margin-top:1px}

/* Main */
.summary{font-size:11px;color:#475569;line-height:1.65;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid #e2e8f0}
.section{margin-bottom:16px}
.section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:4px;margin-bottom:10px}
.entry{margin-bottom:10px}
.entry-header{display:flex;justify-content:space-between;align-items:baseline;gap:6px;flex-wrap:wrap}
.entry-left{flex:1}
.entry-title{font-weight:700;font-size:11.5px;color:#0f172a}
.entry-company{font-size:10.5px;color:#64748b}
.entry-date{font-size:9.5px;color:#94a3b8;white-space:nowrap;flex-shrink:0}
.bullets{margin:5px 0 0 ${isRTL?'0':'16px'};${isRTL?'margin-right:16px;':''}padding:0}
.bullets li{font-size:10.5px;color:#334155;margin-bottom:3px;line-height:1.45}
.proj-tech{font-size:10px;color:#475569;margin-top:2px}
.proj-desc{font-size:10.5px;color:#475569;margin-top:3px;line-height:1.45}
.link{color:#2563eb;font-size:9.5px}
</style></head><body>
<div class="wrapper">
  <div class="sidebar">
    <div class="sb-name">${p.name||'Your Name'}</div>
    ${ex[0]?.role?`<div class="sb-role">${ex[0].role}</div>`:''}

    ${contactHtml?`<div class="sb-section">Contact</div>${contactHtml}`:''}

    ${skillsHtml?`<div class="sb-section">${labels.skills}</div><div>${skillsHtml}</div>`:''}

    ${sideEduHtml?`<div class="sb-section">${labels.education}</div>${sideEduHtml}`:''}
  </div>

  <div class="main">
    ${p.summary?`<div class="summary">${p.summary}</div>`:''}

    ${expHtml?`<div class="section"><div class="section-title">${labels.experience}</div>${expHtml}</div>`:''}

    ${projHtml?`<div class="section"><div class="section-title">${labels.projects}</div>${projHtml}</div>`:''}
  </div>
</div>
</body></html>`;
};
