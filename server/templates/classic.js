/**
 * classic.js  —  Clean, professional, blue accent line.
 * The original template, now a standalone module.
 */
const { getLabels } = require('./pdfLabels');

module.exports = function classicTemplate(r) {
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
    .map((c, i) => (i > 0 ? `<span class="sep">|</span>${c}` : c))
    .join('');

  const expHtml = ex.map(e => `
    <div class="entry">
      <div class="entry-row">
        <div>
          <span class="entry-title">${e.role || ''}</span>
          ${e.company ? `<span class="entry-sub"> — ${e.company}${e.location ? ', ' + e.location : ''}</span>` : ''}
        </div>
        <span class="date">${e.startDate || ''}${e.startDate ? ' – ' : ''}${e.current ? labels.present : (e.endDate || '')}</span>
      </div>
      ${(e.bullets||[]).filter(b=>b.trim()).length
        ? `<ul class="bullets">${e.bullets.filter(b=>b.trim()).map(b=>`<li>${b}</li>`).join('')}</ul>` : ''}
    </div>`).join('');

  const eduHtml = ed.map(e => `
    <div class="entry">
      <div class="entry-row">
        <div>
          <span class="entry-title">${[e.degree,e.field].filter(Boolean).join(' in ') || ''}</span>
          ${e.institution ? `<span class="entry-sub"> — ${e.institution}</span>` : ''}
        </div>
        <span class="date">${e.startDate||''}${e.endDate?' – '+e.endDate:''}</span>
      </div>
      ${e.gpa ? `<div class="detail">${labels.gpa}: ${e.gpa}</div>` : ''}
    </div>`).join('');

  const projHtml = pr.map(proj => `
    <div class="entry">
      <div class="entry-row">
        <span class="entry-title">${proj.name||''}</span>
        ${proj.link ? `<a class="date" href="${proj.link}">${proj.link}</a>` : ''}
      </div>
      ${proj.technologies ? `<div class="detail"><strong>${labels.tech}:</strong> ${proj.technologies}</div>` : ''}
      ${proj.description  ? `<div class="detail">${proj.description}</div>` : ''}
    </div>`).join('');

  const skillsHtml = sk.map(s => `<span class="skill-tag">${s}</span>`).join('');

  return `<!DOCTYPE html><html lang="${lang}" dir="${dir}"><head><meta charset="UTF-8"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${isRTL?"'Cairo',Tahoma,Arial":"Arial,Helvetica"},sans-serif;font-size:12px;color:#1a1a1a;line-height:1.55;direction:${dir}}
a{color:#2563eb;text-decoration:none}
.page{padding:20px 28px}
.header{text-align:center;padding-bottom:10px;border-bottom:2.5px solid #2563eb;margin-bottom:14px}
.header h1{font-size:22px;font-weight:700;color:#111;margin-bottom:5px}
.contact{font-size:10px;color:#555}.sep{margin:0 6px;color:#ccc}
.summary{font-size:11px;color:#444;margin-bottom:12px;line-height:1.6}
.section{margin-bottom:12px}
.section-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#2563eb;border-bottom:1px solid #d1d5db;padding-bottom:3px;margin-bottom:8px}
.entry{margin-bottom:8px}
.entry-row{display:table;width:100%}
.entry-row>div,.entry-row>span.entry-title{display:table-cell}
.entry-row .date{display:table-cell;text-align:${isRTL?'left':'right'};white-space:nowrap;font-size:10px;color:#888;vertical-align:top;padding-${isRTL?'right':'left'}:8px;width:1%}
.entry-title{font-weight:700;font-size:11.5px;color:#111}
.entry-sub{font-size:11px;color:#555}
.detail{font-size:10.5px;color:#555;margin-top:2px}
.bullets{margin:4px 0 0 ${isRTL?'0':'16px'};${isRTL?'margin-right:16px;':''}padding:0}
.bullets li{font-size:11px;color:#333;margin-bottom:2px}
.skills-wrap{display:block;line-height:2}
.skill-tag{display:inline-block;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;padding:1px 8px;border-radius:10px;font-size:10px;font-weight:600;margin:2px 3px 2px 0}
</style></head><body><div class="page">
<div class="header"><h1>${p.name||'Your Name'}</h1>${contact?`<div class="contact">${contact}</div>`:''}</div>
${p.summary?`<div class="summary">${p.summary}</div>`:''}
${expHtml?`<div class="section"><div class="section-title">${labels.experience}</div>${expHtml}</div>`:''}
${eduHtml?`<div class="section"><div class="section-title">${labels.education}</div>${eduHtml}</div>`:''}
${skillsHtml?`<div class="section"><div class="section-title">${labels.skills}</div><div class="skills-wrap">${skillsHtml}</div></div>`:''}
${projHtml?`<div class="section"><div class="section-title">${labels.projects}</div>${projHtml}</div>`:''}
</div></body></html>`;
};
