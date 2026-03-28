import { useState, useRef, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import { translations, SUPPORTED_LANGUAGES } from '../i18n/translations'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = translations[lang]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Change language"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: 999,
          padding: '4px 10px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text)',
        }}
      >
        <span style={{ fontSize: 16 }}>{current.flag}</span>
        <span>{current.lang}</span>
        <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 12, opacity: 0.5 }}>
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          // For RTL we anchor to the left; for LTR to the right
          right: current.dir === 'rtl' ? 'auto' : 0,
          left:  current.dir === 'rtl' ? 0 : 'auto',
          background: 'var(--bg-white)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-md)',
          zIndex: 300,
          overflow: 'hidden',
          minWidth: 150,
        }}>
          {SUPPORTED_LANGUAGES.map(code => {
            const opt = translations[code]
            const active = code === lang
            return (
              <button
                key={code}
                onClick={() => { setLang(code); setOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  border: 'none',
                  background: active ? 'var(--primary-light)' : 'none',
                  padding: '10px 14px',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: active ? 700 : 400,
                  color: active ? 'var(--primary)' : 'var(--text)',
                  textAlign: 'start',
                }}
              >
                <span style={{ fontSize: 18 }}>{opt.flag}</span>
                <span>{opt.lang}</span>
                {active && (
                  <span style={{ marginInlineStart: 'auto', fontSize: 11, opacity: 0.6 }}>✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
