<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    setOpen(false)
    await logout()
    navigate('/login')
  }
=======
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
>>>>>>> 1b585c7 (Ready, Set, Go!)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
<<<<<<< HEAD
        {t.nav.brand}
      </Link>

      <div className="navbar-actions">
        {/* Language Switcher always visible */}
        <LanguageSwitcher />

        {user ? (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/editor')}
            >
              {t.nav.newResume}
            </button>

            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setOpen(o => !o)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  padding: '4px 12px 4px 4px',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text)',
                }}
              >
                <Avatar user={user} />
                <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, opacity: .5 }}>
                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd"/>
                </svg>
              </button>

              {open && (
                <div style={{
                  position: 'absolute',
                  insetInlineEnd: 0,
                  top: 'calc(100% + 8px)',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-md)',
                  minWidth: 200,
                  zIndex: 200,
                  overflow: 'hidden',
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{user.email}</div>
                  </div>
                  <MenuItem icon="📄" label={t.nav.myResumes}  onClick={() => { setOpen(false); navigate('/') }} />
                  <MenuItem icon="🚪" label={t.nav.signOut}    onClick={handleLogout} danger />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-ghost btn-sm"   onClick={() => navigate('/login')}>{t.nav.signIn}</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>{t.nav.getStarted}</button>
          </>
        )}
=======
        ResumeBuilder
      </Link>

      <div className="navbar-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/editor')}
        >
          + New Resume
        </button>
>>>>>>> 1b585c7 (Ready, Set, Go!)
      </div>
    </nav>
  )
}
<<<<<<< HEAD

function Avatar({ user }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        referrerPolicy="no-referrer"
        style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
      />
    )
  }
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'var(--primary)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

function MenuItem({ icon, label, onClick, danger }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', background: hover ? (danger ? '#fef2f2' : 'var(--bg)') : 'none',
        border: 'none', padding: '10px 16px',
        cursor: 'pointer', fontSize: 13,
        color: danger ? 'var(--danger)' : 'var(--text)',
        textAlign: 'start',
      }}
    >
      <span>{icon}</span>{label}
    </button>
  )
}
=======
>>>>>>> 1b585c7 (Ready, Set, Go!)
