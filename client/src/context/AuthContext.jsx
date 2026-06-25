import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const api = axios.create({
  baseURL:         import.meta.env.VITE_API_URL || '/api',
  timeout:         30000,
  withCredentials: true,
})

let memoryToken = null

function saveToken(t)  { memoryToken = t; sessionStorage.setItem('_at', t) }
function loadToken()   { return memoryToken || sessionStorage.getItem('_at') }
function clearToken()  { memoryToken = null; sessionStorage.removeItem('_at') }

let refreshPromise = null

async function silentRefresh() {
  if (refreshPromise) return refreshPromise
  refreshPromise = api.post('/auth/refresh')
    .then(({ data }) => { saveToken(data.accessToken); return data.accessToken })
    .finally(() => { refreshPromise = null })
  return refreshPromise
}

api.interceptors.request.use(config => {
  const token = loadToken()
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config
    const data     = err.response?.data

    if (
      err.response?.status === 401 &&
      data?.code === 'TOKEN_EXPIRED' &&
      !original._retry
    ) {
      original._retry = true
      try {
        const newToken = await silentRefresh()
        original.headers['Authorization'] = `Bearer ${newToken}`
        return api(original)
      } catch {
        clearToken()
        window.dispatchEvent(new Event('auth:logout'))
      }
    }
    return Promise.reject(err)
  }
)

export { api }

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    silentRefresh()
      .then(() => api.get('/auth/me'))
      .then(({ data }) => setUser(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const handler = () => { setUser(null); clearToken() }
    window.addEventListener('auth:logout', handler)
    return () => window.removeEventListener('auth:logout', handler)
  }, [])

  useEffect(() => {
    if (!user) return
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      silentRefresh().catch(() => {})
    }, 14 * 60 * 1000)
    return () => clearTimeout(timerRef.current)
  }, [user])

  const register = useCallback(async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    saveToken(data.accessToken)
    setUser(data.user)
  }, [])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    saveToken(data.accessToken)
    setUser(data.user)
  }, [])

  const googleLogin = useCallback(async (credential) => {
    const { data } = await api.post('/auth/google', { credential })
    saveToken(data.accessToken)
    setUser(data.user)
  }, [])

  const logout = useCallback(async () => {
    try { await api.post('/auth/logout') } catch {}
    clearToken()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, register, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
