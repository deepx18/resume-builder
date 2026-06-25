/**
 * minimal.js  —  Ultra-clean, monochrome, serif typography.
 * No colours, no borders — just excellent spacing and hierarchy.
 */
const { getLabels } = require('./pdfLabels');

module.exports = function minimalTemplate(r) {
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
    .filter(Boolean).join('  ·  ');

  const expHtml = ex.map(e => `
    <div class="entry">
      <div class="entry-row">
        <div class="entry-main">
          <span class="entry-title">${e.role||''}</span>
          ${e.company?`<span class="entry-org">, ${e.company}${e.location?', '+e.location:''}</span>`:''}
        </div>
        <span class="entry-date">${e.startDate||''}${e.startDate?' – ':''}${e.current?labels.present:(e.endDate||'')}</span>
      </div>
      ${(e.bullets||[]).filter(b=>b.trim()).length
        ?`<ul class="bullets">${e.bullets.filter(b=>b.trim()).map(b=>`<li>${b}</li>`).join('')}</ul>`:''
      }
    </div>`).join('');

  const eduHtml = ed.map(e => `
    <div class="entry">
      <div class="entry-row">
        <div class="entry-main">
          <span class="entry-title">${[e.degree,e.field].filter(Boolean).join(' in ')||''}</span>
          ${e.institution?`<span class="entry-org">, ${e.institution}</span>`:''}
        </div>
        <span class="entry-date">${e.startDate||''}${e.endDate?' – '+e.endDate:''}</span>
      </div>
      ${e.gpa?`<div class="small-note">${labels.gpa}: ${e.gpa}</div>`:''}
    </div>`).join('');

  const projHtml = pr.map(proj => `
    <div class="entry">
      <div class="entry-row">
        <span class="entry-title">${proj.name||''}</span>
        ${proj.link?`<a class="entry-date" href="${proj.link}">${proj.link}</a>`:''}
      </div>
      ${proj.technologies?`<div class="small-note">${labels.tech}: ${proj.technologies}</div>`:''}
      ${proj.description?`<div class="small-note">${proj.description}</div>`:''}
    </div>`).join('');

  const skillsLine = sk.join(' · ');

  return `<!DOCTYPE html><html lang="${lang}" dir="${dir}"><head><meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${isRTL?"'Cairo',Tahoma,Arial":'"Georgia","Times New Roman",serif'};font-size:11.5px;color:#111;line-height:1.6;background:#fff;direction:${dir}}
a{color:#111;text-decoration:underline}
.page{padding:32px 36px;max-width:700px;margin:0 auto}

/* Header */
.header{text-align:center;margin-bottom:24px}
.header h1{font-size:26px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#000;margin-bottom:6px}
.contact{font-size:9.5px;color:#555;letter-spacing:.5px}

/* Summary */
.summary{font-size:11px;color:#333;margin-bottom:22px;font-style:italic;line-height:1.7;text-align:center}

/* Sections */
.section{margin-bottom:18px}
.section-title{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#000;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #000}

/* Entries */
.entry{margin-bottom:10px}
.entry-row{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.entry-main{flex:1}
.entry-title{font-weight:700;font-size:11.5px;color:#000}
.entry-org{font-size:11px;color:#444;font-style:italic}
.entry-date{font-size:9.5px;color:#777;white-space:nowrap;flex-shrink:0;font-style:normal}
.small-note{font-size:10px;color:#555;margin-top:2px}
.bullets{margin:4px 0 0 ${isRTL?'0':'14px'};${isRTL?'margin-right:14px;':''}padding:0;list-style:disc}
.bullets li{font-size:10.5px;color:#222;margin-bottom:2px;line-height:1.45}

/* Skills */
.skills-line{font-size:10.5px;color:#333;line-height:1.8}
</style></head><body><div class="page">

<div class="header">
  <h1>${p.name||'Your Name'}</h1>
  ${contact?`<div class="contact">${contact}</div>`:''}
</div>

${p.summary?`<div class="summary">${p.summary}</div>`:''}

${expHtml?`<div class="section"><div class="section-title">${labels.experience}</div>${expHtml}</div>`:''}

${eduHtml?`<div class="section"><div class="section-title">${labels.education}</div>${eduHtml}</div>`:''}

${skillsLine?`<div class="section"><div class="section-title">${labels.skills}</div><div class="skills-line">${skillsLine}</div></div>`:''}

${projHtml?`<div class="section"><div class="section-title">${labels.projects}</div>${projHtml}</div>`:''}

</div></body></html>`;
};
