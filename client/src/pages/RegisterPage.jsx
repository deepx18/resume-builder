import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'

export default function RegisterPage() {
  const { register, googleLogin, user } = useAuth()
  const { t } = useLang()
  const navigate = useNavigate()

  const [form,  setForm]  = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [busy,  setBusy]  = useState(false)

  useEffect(() => { if (user) navigate('/') }, [user])

  useEffect(() => {
    if (!window.google || !import.meta.env.VITE_GOOGLE_CLIENT_ID) return
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback:  handleGoogleCallback,
    })
    window.google.accounts.id.renderButton(
      document.getElementById('google-btn-reg'),
      { theme: 'outline', size: 'large', width: '100%', text: 'signup_with' }
    )
  }, [])

  const handleGoogleCallback = async ({ credential }) => {
    setBusy(true); setError('')
    try   { await googleLogin(credential); navigate('/') }
    catch (e) { setError(e.response?.data?.error || 'Google sign-up failed.') }
    finally   { setBusy(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    if (form.password !== form.confirm) return setError(t.auth.passwordMismatch)
    if (form.password.length < 8)       return setError(t.auth.passwordTooShort)
    setBusy(true)
    try   { await register(form.name, form.email, form.password); navigate('/') }
    catch (e) { setError(e.response?.data?.error || 'Registration failed.') }
    finally   { setBusy(false) }
  }

  const set = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ width: 32, height: 32 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span style={styles.logoText}>{t.nav.brand}</span>
        </div>

        <h1 style={styles.title}>{t.auth.createAccount}</h1>
        <p style={styles.sub}>{t.auth.createAccountSubtitle}</p>

        {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <>
            <div id="google-btn-reg" style={{ marginBottom: 16 }} />
            <Divider label={t.auth.orContinueWith} />
          </>
        )}

        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}

          <div className="form-group">
            <label className="form-label">{t.auth.fullName}</label>
            <input className="form-control" type="text" placeholder="Jane Doe"
              value={form.name} onChange={set('name')} required autoComplete="name" />
          </div>

          <div className="form-group">
            <label className="form-label">{t.auth.email}</label>
            <input className="form-control" type="email" placeholder="you@example.com"
              value={form.email} onChange={set('email')} required autoComplete="email" />
          </div>

          <div className="form-group">
            <label className="form-label">{t.auth.password}</label>
            <input className="form-control" type="password" placeholder="Min. 8 characters"
              value={form.password} onChange={set('password')} required autoComplete="new-password" />
          </div>

          <div className="form-group">
            <label className="form-label">{t.auth.confirmPassword}</label>
            <input className="form-control" type="password" placeholder="Repeat password"
              value={form.confirm} onChange={set('confirm')} required autoComplete="new-password" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 4 }} disabled={busy}>
            {busy
              ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> {t.auth.creatingAccount}</>
              : t.auth.createAccountBtn}
          </button>
        </form>

        <p style={styles.footer}>
          {t.auth.alreadyHave}{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>{t.auth.signInLink}</Link>
        </p>
      </div>
    </div>
  )
}

function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 16px', color: 'var(--text-muted)', fontSize: 12 }}>
      <div style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
      <span>{label}</span>
      <div style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
    </div>
  )
}

const styles = {
  page:     { minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--bg)' },
  card:     { background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '40px 36px', width: '100%', maxWidth: 420 },
  logo:     { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, justifyContent: 'center' },
  logoText: { fontSize: 20, fontWeight: 700, color: 'var(--primary)' },
  title:    { fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' },
  sub:      { fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, textAlign: 'center' },
  error:    { background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: 13, marginBottom: 14 },
  footer:   { marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' },
}
