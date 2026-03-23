import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, googleLogin, user } = useAuth()
  const navigate = useNavigate()

  const [form,   setForm]   = useState({ email: '', password: '' })
  const [error,  setError]  = useState('')
  const [busy,   setBusy]   = useState(false)

  // Redirect if already logged in
  useEffect(() => { if (user) navigate('/') }, [user])

  // Initialise Google Identity Services button
  useEffect(() => {
    if (!window.google || !import.meta.env.VITE_GOOGLE_CLIENT_ID) return
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback:  handleGoogleCallback,
    })
    window.google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large', width: '100%', text: 'signin_with' }
    )
  }, [])

  const handleGoogleCallback = async ({ credential }) => {
    setBusy(true); setError('')
    try {
      await googleLogin(credential)
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.error || 'Google sign-in failed.')
    } finally {
      setBusy(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true); setError('')
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.error || 'Login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ width: 32, height: 32 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span style={styles.logoText}>ResumeBuilder</span>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.sub}>Sign in to manage your resumes</p>

        {/* Google button */}
        {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
          <>
            <div id="google-btn" style={{ marginBottom: 16 }} />
            <div style={styles.divider}><span>or continue with email</span></div>
          </>
        )}

        {/* Email / password form */}
        <form onSubmit={handleSubmit}>
          {error && <div style={styles.error}>{error}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 4 }}
            disabled={busy}
          >
            {busy ? <><span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Signing in…</> : 'Sign In'}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: 'calc(100vh - 56px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    background: 'var(--bg)',
  },
  card: {
    background: 'var(--bg-white)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-md)',
    padding: '40px 36px',
    width: '100%',
    maxWidth: 420,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    justifyContent: 'center',
  },
  logoText: { fontSize: 20, fontWeight: 700, color: 'var(--primary)' },
  title: { fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' },
  sub:   { fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, textAlign: 'center' },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#b91c1c',
    borderRadius: 'var(--radius)',
    padding: '10px 14px',
    fontSize: 13,
    marginBottom: 14,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    margin: '16px 0',
    color: 'var(--text-muted)',
    fontSize: 12,
    '::before': { content: '""', flex: 1, borderTop: '1px solid var(--border)' },
  },
  footer: { marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' },
}
