import { useResume } from '../../context/ResumeContext'
import { useLang }   from '../../context/LanguageContext'

/* ─── helpers ──────────────────────────────────────────────── */
function isEmpty(r) {
  return !r.personalInfo?.name && !r.experience?.length && !r.education?.length
}
function Bullets({ items, color = '#333' }) {
  if (!items) return null
  const filtered = items.filter(b => b && b.trim())
  if (!filtered.length) return null
  return (
    <ul style={{ margin:'4px 0 0 16px', padding:0 }}>
      {filtered.map((b,i)=><li key={i} style={{fontSize:11,color,marginBottom:2}}>{b}</li>)}
    </ul>
  )
}

/* ═══ CLASSIC ══════════════════════════════════════════════════ */
function ClassicPreview({ r, t, dir }) {
  const p=r.personalInfo||{}; const ex=r.experience||[]; const ed=r.education||[]; const sk=r.skills||[]; const pr=r.projects||[]
  const contact=[p.email,p.phone,p.location,p.website,p.linkedin].filter(Boolean)
  const font=dir==='rtl'?'Tahoma,Arial,sans-serif':"'Segoe UI',Arial,sans-serif"
  return (
    <div style={{fontFamily:font,fontSize:12,lineHeight:1.55,color:'#1a1a1a',direction:dir}}>
      <div style={{textAlign:'center',paddingBottom:10,borderBottom:'2.5px solid #2563eb',marginBottom:14}}>
        <h1 style={{fontSize:22,fontWeight:700,marginBottom:4,color:'#111'}}>{p.name||<span style={{color:'#9ca3af'}}>Your Name</span>}</h1>
        {contact.length>0&&<div style={{fontSize:10.5,color:'#555',display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'0 6px'}}>{contact.map((c,i)=><span key={i}>{i>0&&<span style={{color:'#ccc',margin:'0 4px'}}>|</span>}{c}</span>)}</div>}
      </div>
      {p.summary&&<p style={{fontSize:11,color:'#444',lineHeight:1.6,marginBottom:8}}>{p.summary}</p>}
      {ex.length>0&&<ClassicSection title={t.pdf.experience}>{ex.map((e,i)=><ClassicEntry key={i} e={e} t={t} dir={dir}><Bullets items={e.bullets}/></ClassicEntry>)}</ClassicSection>}
      {ed.length>0&&<ClassicSection title={t.pdf.education}>{ed.map((e,i)=>(
        <div key={i} style={{marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:4}}>
            <div><span style={{fontWeight:600,fontSize:12,color:'#111'}}>{[e.degree,e.field].filter(Boolean).join(' in ')}</span>{e.institution&&<span style={{fontSize:11,color:'#555'}}> — {e.institution}</span>}</div>
            <span style={{fontSize:10.5,color:'#888',whiteSpace:'nowrap'}}>{e.startDate}{e.endDate?' – '+e.endDate:''}</span>
          </div>
          {e.gpa&&<div style={{fontSize:10.5,color:'#555'}}>{t.pdf.gpa}: {e.gpa}</div>}
        </div>
      ))}</ClassicSection>}
      {sk.length>0&&<ClassicSection title={t.pdf.skills}><div style={{display:'flex',flexWrap:'wrap',gap:5}}>{sk.map((s,i)=><span key={i} style={{background:'#eff6ff',color:'#1d4ed8',border:'1px solid #bfdbfe',padding:'2px 8px',borderRadius:12,fontSize:10.5,fontWeight:500}}>{s}</span>)}</div></ClassicSection>}
      {pr.length>0&&<ClassicSection title={t.pdf.projects}>{pr.map((proj,i)=>(
        <div key={i} style={{marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
            <span style={{fontWeight:600,fontSize:12}}>{proj.name}</span>
            {proj.link&&<a href={proj.link} style={{fontSize:10.5,color:'#2563eb'}}>View →</a>}
          </div>
          {proj.technologies&&<div style={{fontSize:10.5,color:'#555'}}><strong>{t.pdf.tech}:</strong> {proj.technologies}</div>}
          {proj.description&&<p style={{fontSize:11,color:'#444',margin:'3px 0 0'}}>{proj.description}</p>}
        </div>
      ))}</ClassicSection>}
    </div>
  )
}
function ClassicSection({title,children}){return(<div style={{marginBottom:12}}><div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:'#2563eb',borderBottom:'1px solid #d1d5db',paddingBottom:3,marginBottom:8,marginTop:14}}>{title}</div>{children}</div>)}
function ClassicEntry({e,t,dir,children}){return(<div style={{marginBottom:8}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:4}}><div><span style={{fontWeight:600,fontSize:12,color:'#111'}}>{e.role}</span>{e.company&&<span style={{fontSize:11,color:'#555'}}> — {e.company}{e.location?`, ${e.location}`:''}</span>}</div><span style={{fontSize:10.5,color:'#888',whiteSpace:'nowrap'}}>{e.startDate}{e.startDate?' – ':''}{e.current?t.pdf.present:e.endDate||''}</span></div>{children}</div>)}

/* ═══ MODERN ═══════════════════════════════════════════════════ */
function ModernPreview({ r, t, dir }) {
  const p=r.personalInfo||{}; const ex=r.experience||[]; const ed=r.education||[]; const sk=r.skills||[]; const pr=r.projects||[]
  const font=dir==='rtl'?'Tahoma,Arial,sans-serif':"'Segoe UI',Arial,sans-serif"
  return (
    <div style={{display:'flex',minHeight:'100%',direction:dir,fontFamily:font,fontSize:11.5}}>
      <div style={{width:170,flexShrink:0,background:'#1e3a5f',color:'#e2e8f0',padding:'20px 14px'}}>
        <div style={{fontSize:15,fontWeight:700,color:'#fff',marginBottom:3}}>{p.name||'Your Name'}</div>
        {ex[0]?.role&&<div style={{fontSize:9,color:'#93c5fd',textTransform:'uppercase',letterSpacing:1,marginBottom:14}}>{ex[0].role}</div>}
        {[p.email,p.phone,p.location].filter(Boolean).length>0&&<><SbSec>Contact</SbSec>{[p.email,p.phone,p.location].filter(Boolean).map((c,i)=><div key={i} style={{fontSize:9,color:'#cbd5e1',marginBottom:4,wordBreak:'break-all'}}>{c}</div>)}</>}
        {sk.length>0&&<><SbSec>{t.pdf.skills}</SbSec><div>{sk.map((s,i)=><span key={i} style={{display:'inline-block',background:'rgba(255,255,255,.12)',color:'#e2e8f0',borderRadius:20,padding:'2px 7px',fontSize:8.5,margin:'2px 2px 2px 0'}}>{s}</span>)}</div></>}
        {ed.length>0&&<><SbSec>{t.pdf.education}</SbSec>{ed.map((e,i)=><div key={i} style={{marginBottom:8}}><div style={{fontSize:9.5,fontWeight:600,color:'#f1f5f9'}}>{[e.degree,e.field].filter(Boolean).join(' in ')}</div>{e.institution&&<div style={{fontSize:8.5,color:'#94a3b8'}}>{e.institution}</div>}<div style={{fontSize:8.5,color:'#64748b'}}>{e.startDate}{e.endDate?' – '+e.endDate:''}</div></div>)}</>}
      </div>
      <div style={{flex:1,padding:'20px 18px',background:'#fff'}}>
        {p.summary&&<p style={{fontSize:10.5,color:'#475569',lineHeight:1.65,marginBottom:16,paddingBottom:12,borderBottom:'1px solid #e2e8f0'}}>{p.summary}</p>}
        {ex.length>0&&<MdnSec title={t.pdf.experience}>{ex.map((e,i)=><div key={i} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:4}}><div><span style={{fontWeight:700,fontSize:11,color:'#0f172a'}}>{e.role}</span>{e.company&&<span style={{fontSize:10,color:'#64748b'}}> · {e.company}{e.location?', '+e.location:''}</span>}</div><span style={{fontSize:9,color:'#94a3b8',whiteSpace:'nowrap'}}>{e.startDate}{e.startDate?' – ':''}{e.current?t.pdf.present:e.endDate||''}</span></div><Bullets items={e.bullets} color='#334155'/></div>)}</MdnSec>}
        {pr.length>0&&<MdnSec title={t.pdf.projects}>{pr.map((proj,i)=><div key={i} style={{marginBottom:8}}><div style={{fontWeight:700,fontSize:11,color:'#0f172a'}}>{proj.name}</div>{proj.technologies&&<div style={{fontSize:9.5,color:'#475569'}}><strong>{t.pdf.tech}:</strong> {proj.technologies}</div>}{proj.description&&<div style={{fontSize:10,color:'#475569',marginTop:2}}>{proj.description}</div>}</div>)}</MdnSec>}
      </div>
    </div>
  )
}
function SbSec({children}){return <div style={{fontSize:8.5,fontWeight:700,textTransform:'uppercase',letterSpacing:1.2,color:'#93c5fd',borderBottom:'1px solid rgba(255,255,255,.15)',paddingBottom:3,margin:'14px 0 7px'}}>{children}</div>}
function MdnSec({title,children}){return <div style={{marginBottom:14}}><div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:.8,color:'#1e3a5f',borderBottom:'2px solid #1e3a5f',paddingBottom:3,marginBottom:8}}>{title}</div>{children}</div>}

/* ═══ MINIMAL ══════════════════════════════════════════════════ */
function MinimalPreview({ r, t, dir }) {
  const p=r.personalInfo||{}; const ex=r.experience||[]; const ed=r.education||[]; const sk=r.skills||[]; const pr=r.projects||[]
  const contact=[p.email,p.phone,p.location,p.website,p.linkedin].filter(Boolean).join('  ·  ')
  const font=dir==='rtl'?'Tahoma,Arial,sans-serif':'"Georgia","Times New Roman",serif'
  return (
    <div style={{fontFamily:font,fontSize:11.5,lineHeight:1.6,color:'#111',direction:dir}}>
      <div style={{textAlign:'center',marginBottom:22}}><h1 style={{fontSize:24,fontWeight:700,letterSpacing:2,textTransform:'uppercase',marginBottom:6}}>{p.name||'Your Name'}</h1>{contact&&<div style={{fontSize:9.5,color:'#555',letterSpacing:.5}}>{contact}</div>}</div>
      {p.summary&&<p style={{fontSize:11,color:'#333',marginBottom:20,fontStyle:'italic',lineHeight:1.7,textAlign:'center'}}>{p.summary}</p>}
      {ex.length>0&&<MinSec title={t.pdf.experience}>{ex.map((e,i)=><div key={i} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:8}}><div><span style={{fontWeight:700,fontSize:12}}>{e.role}</span>{e.company&&<span style={{fontSize:11,color:'#444',fontStyle:'italic'}}>, {e.company}{e.location?', '+e.location:''}</span>}</div><span style={{fontSize:9.5,color:'#777',whiteSpace:'nowrap'}}>{e.startDate}{e.startDate?' – ':''}{e.current?t.pdf.present:e.endDate||''}</span></div><Bullets items={e.bullets} color='#222'/></div>)}</MinSec>}
      {ed.length>0&&<MinSec title={t.pdf.education}>{ed.map((e,i)=><div key={i} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:8}}><div><span style={{fontWeight:700,fontSize:12}}>{[e.degree,e.field].filter(Boolean).join(' in ')}</span>{e.institution&&<span style={{fontSize:11,color:'#444',fontStyle:'italic'}}>, {e.institution}</span>}</div><span style={{fontSize:9.5,color:'#777',whiteSpace:'nowrap'}}>{e.startDate}{e.endDate?' – '+e.endDate:''}</span></div>{e.gpa&&<div style={{fontSize:10,color:'#555'}}>{t.pdf.gpa}: {e.gpa}</div>}</div>)}</MinSec>}
      {sk.length>0&&<MinSec title={t.pdf.skills}><div style={{fontSize:10.5,color:'#333',lineHeight:1.8}}>{sk.join(' · ')}</div></MinSec>}
      {pr.length>0&&<MinSec title={t.pdf.projects}>{pr.map((proj,i)=><div key={i} style={{marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:8}}><span style={{fontWeight:700,fontSize:12}}>{proj.name}</span>{proj.link&&<span style={{fontSize:9.5,color:'#777'}}>{proj.link}</span>}</div>{proj.technologies&&<div style={{fontSize:10,color:'#555'}}>{t.pdf.tech}: {proj.technologies}</div>}{proj.description&&<div style={{fontSize:10,color:'#555',marginTop:2}}>{proj.description}</div>}</div>)}</MinSec>}
    </div>
  )
}
function MinSec({title,children}){return <div style={{marginBottom:18}}><div style={{fontSize:9.5,fontWeight:700,textTransform:'uppercase',letterSpacing:2,color:'#000',borderBottom:'1px solid #000',paddingBottom:4,marginBottom:8}}>{title}</div>{children}</div>}

/* ═══ EXECUTIVE ════════════════════════════════════════════════ */
function ExecutivePreview({ r, t, dir }) {
  const p=r.personalInfo||{}; const ex=r.experience||[]; const ed=r.education||[]; const sk=r.skills||[]; const pr=r.projects||[]
  const contact=[p.email,p.phone,p.location,p.website,p.linkedin].filter(Boolean)
  const font=dir==='rtl'?'Tahoma,Arial,sans-serif':"'Segoe UI',Arial,sans-serif"
  return (
    <div style={{fontFamily:font,fontSize:11.5,lineHeight:1.55,color:'#1c1c1c',direction:dir}}>
      <div style={{background:'#1c1c2e',padding:'22px 24px 16px'}}>
        <div style={{fontSize:22,fontWeight:700,color:'#fff',marginBottom:3}}>{p.name||'Your Name'}</div>
        {ex[0]?.role&&<div style={{fontSize:9,textTransform:'uppercase',letterSpacing:2,color:'#b7860b',marginBottom:8}}>{ex[0].role}</div>}
        <div style={{fontSize:9.5,color:'#aaa',display:'flex',flexWrap:'wrap',gap:'0 8px'}}>{contact.map((c,i)=><span key={i}>{i>0&&<span style={{color:'#444',margin:'0 4px'}}>|</span>}{c}</span>)}</div>
      </div>
      <div style={{height:4,background:'linear-gradient(90deg,#b7860b,#f0c040,#b7860b)',marginBottom:18}}/>
      <div style={{padding:'0 24px 20px'}}>
        {p.summary&&<p style={{fontSize:11,color:'#374151',lineHeight:1.7,marginBottom:18,paddingBottom:14,borderBottom:'1px solid #e5e7eb'}}>{p.summary}</p>}
        {ex.length>0&&<ExecSec title={t.pdf.experience}>{ex.map((e,i)=><div key={i} style={{marginBottom:10,paddingBottom:10,borderBottom:'1px solid #f3f4f6'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:8,flexWrap:'wrap'}}><div><span style={{fontWeight:700,fontSize:12,color:'#111'}}>{e.role}</span>{e.company&&<span style={{fontSize:10.5,color:'#6b7280'}}> · {e.company}{e.location?', '+e.location:''}</span>}</div><span style={{fontSize:9.5,color:'#b7860b',fontWeight:600,whiteSpace:'nowrap'}}>{e.startDate}{e.startDate?' – ':''}{e.current?t.pdf.present:e.endDate||''}</span></div><Bullets items={e.bullets} color='#374151'/></div>)}</ExecSec>}
        {ed.length>0&&<ExecSec title={t.pdf.education}>{ed.map((e,i)=><div key={i} style={{marginBottom:8,paddingBottom:8,borderBottom:'1px solid #f3f4f6'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:8,flexWrap:'wrap'}}><div><span style={{fontWeight:700,fontSize:11,color:'#111'}}>{[e.degree,e.field].filter(Boolean).join(' in ')}</span>{e.institution&&<span style={{fontSize:10.5,color:'#6b7280'}}> · {e.institution}</span>}</div><span style={{fontSize:9.5,color:'#b7860b',fontWeight:600,whiteSpace:'nowrap'}}>{e.startDate}{e.endDate?' – '+e.endDate:''}</span></div>{e.gpa&&<div style={{fontSize:10,color:'#6b7280'}}>{t.pdf.gpa}: {e.gpa}</div>}</div>)}</ExecSec>}
        {sk.length>0&&<ExecSec title={t.pdf.skills}><div style={{display:'flex',flexWrap:'wrap',gap:5}}>{sk.map((s,i)=><span key={i} style={{background:'#fefce8',color:'#92400e',border:'1px solid #fde68a',padding:'2px 10px',borderRadius:3,fontSize:9.5,fontWeight:600}}>{s}</span>)}</div></ExecSec>}
        {pr.length>0&&<ExecSec title={t.pdf.projects}>{pr.map((proj,i)=><div key={i} style={{marginBottom:8,paddingBottom:8,borderBottom:'1px solid #f3f4f6'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><span style={{fontWeight:700,fontSize:11,color:'#111'}}>{proj.name}</span>{proj.link&&<a href={proj.link} style={{fontSize:9.5,color:'#b7860b'}}>{proj.link}</a>}</div>{proj.technologies&&<div style={{fontSize:10,color:'#6b7280'}}><em>{t.pdf.tech}:</em> {proj.technologies}</div>}{proj.description&&<div style={{fontSize:10,color:'#6b7280',marginTop:2}}>{proj.description}</div>}</div>)}</ExecSec>}
      </div>
    </div>
  )
}
function ExecSec({title,children}){return <div style={{marginBottom:18}}><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><span style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:1.5,color:'#b7860b'}}>{title}</span><div style={{flex:1,height:1,background:'#e5e7eb'}}/></div>{children}</div>}

/* ═══ CREATIVE ══════════════════════════════════════════════════ */
function CreativePreview({ r, t, dir }) {
  const p=r.personalInfo||{}; const ex=r.experience||[]; const ed=r.education||[]; const sk=r.skills||[]; const pr=r.projects||[]
  const contact=[p.email,p.phone,p.location,p.website,p.linkedin].filter(Boolean)
  const font=dir==='rtl'?'Tahoma,Arial,sans-serif':"'Segoe UI',system-ui,Arial,sans-serif"
  return (
    <div style={{fontFamily:font,fontSize:11.5,lineHeight:1.55,color:'#1f2937',direction:dir}}>
      <div style={{background:'#0f172a',padding:'22px 24px 16px',borderBottom:'5px solid #0d9488'}}>
        <div style={{fontSize:22,fontWeight:800,color:'#fff',letterSpacing:.5,marginBottom:4}}>{p.name||'Your Name'}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'4px 12px'}}>{contact.map((c,i)=><span key={i} style={{fontSize:9.5,color:'#94a3b8'}}>{c}</span>)}</div>
      </div>
      <div style={{padding:'18px 24px 20px'}}>
        {p.summary&&<div style={{fontSize:11,color:'#374151',lineHeight:1.7,background:'#f0fdfa',borderInlineStart:'3px solid #0d9488',padding:'10px 14px',marginBottom:18,borderRadius:'0 4px 4px 0'}}>{p.summary}</div>}
        {ex.length>0&&<CreaSec title={t.pdf.experience}>{ex.map((e,i)=><div key={i} style={{display:'flex',gap:10,marginBottom:10}}><div style={{width:8,height:8,borderRadius:'50%',background:'#0d9488',flexShrink:0,marginTop:4}}/><div style={{flex:1}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:4}}><div><span style={{fontWeight:700,fontSize:12,color:'#0f172a'}}>{e.role}</span>{e.company&&<span style={{fontSize:10.5,color:'#f97316',fontWeight:600}}> @ {e.company}{e.location?', '+e.location:''}</span>}</div><span style={{fontSize:9,color:'#9ca3af',background:'#f3f4f6',padding:'1px 6px',borderRadius:10,whiteSpace:'nowrap'}}>{e.startDate}{e.startDate?' – ':''}{e.current?t.pdf.present:e.endDate||''}</span></div><Bullets items={e.bullets} color='#374151'/></div></div>)}</CreaSec>}
        {ed.length>0&&<CreaSec title={t.pdf.education}>{ed.map((e,i)=><div key={i} style={{display:'flex',gap:10,marginBottom:10}}><div style={{width:8,height:8,borderRadius:'50%',background:'#0d9488',flexShrink:0,marginTop:4}}/><div style={{flex:1}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:4}}><div><span style={{fontWeight:700,fontSize:12,color:'#0f172a'}}>{[e.degree,e.field].filter(Boolean).join(' in ')}</span>{e.institution&&<span style={{fontSize:10.5,color:'#f97316',fontWeight:600}}> @ {e.institution}</span>}</div><span style={{fontSize:9,color:'#9ca3af',background:'#f3f4f6',padding:'1px 6px',borderRadius:10,whiteSpace:'nowrap'}}>{e.startDate}{e.endDate?' – '+e.endDate:''}</span></div>{e.gpa&&<div style={{fontSize:10,color:'#6b7280'}}>{t.pdf.gpa}: {e.gpa}</div>}</div></div>)}</CreaSec>}
        {sk.length>0&&<CreaSec title={t.pdf.skills}><div style={{display:'flex',flexWrap:'wrap',gap:5}}>{sk.map((s,i)=><span key={i} style={{background:'#ecfdf5',color:'#065f46',border:'1px solid #6ee7b7',padding:'3px 10px',borderRadius:20,fontSize:9.5,fontWeight:600}}>{s}</span>)}</div></CreaSec>}
        {pr.length>0&&<CreaSec title={t.pdf.projects}><div style={{display:'flex',flexWrap:'wrap',gap:10}}>{pr.map((proj,i)=><div key={i} style={{flex:1,minWidth:160,background:'#fafafa',border:'1px solid #e5e7eb',borderTop:'3px solid #f97316',borderRadius:4,padding:'10px 12px'}}><div style={{fontWeight:700,fontSize:11,color:'#0f172a',marginBottom:3}}>{proj.name}{proj.link&&<a href={proj.link} style={{color:'#0d9488',marginLeft:4,fontSize:11}}>↗</a>}</div>{proj.technologies&&<div style={{fontSize:9.5,color:'#f97316',fontWeight:600,marginBottom:4}}>{proj.technologies}</div>}{proj.description&&<div style={{fontSize:10,color:'#6b7280',lineHeight:1.45}}>{proj.description}</div>}</div>)}</div></CreaSec>}
      </div>
    </div>
  )
}
function CreaSec({title,children}){return <div style={{marginBottom:18}}><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><span style={{fontSize:10.5,fontWeight:800,textTransform:'uppercase',letterSpacing:1.5,color:'#0d9488'}}>{title}</span><div style={{flex:1,height:2,background:'#ccfbf1'}}/></div>{children}</div>}

/* ═══ Router ════════════════════════════════════════════════════ */
const PREVIEW_MAP = { classic: ClassicPreview, modern: ModernPreview, minimal: MinimalPreview, executive: ExecutivePreview, creative: CreativePreview }

export default function ResumePreview() {
  const { resume: r } = useResume()
  const { t, dir }    = useLang()

  if (isEmpty(r)) return (
    <div style={{textAlign:'center',padding:'40px 0',color:'#9ca3af'}}>
      <div style={{fontSize:32,marginBottom:8}}>📄</div>
      <div style={{fontSize:13}}>{t.preview?.emptyTitle||'Your resume preview will appear here'}</div>
      <div style={{fontSize:11,marginTop:4}}>{t.preview?.emptyHint||'Start filling in the form on the left'}</div>
    </div>
  )

  const Preview = PREVIEW_MAP[r.template] || ClassicPreview
  return <Preview r={r} t={t} dir={dir} />
}
