import { Routes, Route } from 'react-router-dom'
import { ResumeProvider }  from './context/ResumeContext'
import { AuthProvider }    from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import ProtectedRoute      from './components/Auth/ProtectedRoute'
import Navbar       from './components/Navbar'
import HomePage     from './pages/HomePage'
import EditorPage   from './pages/EditorPage'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ResumeProvider>
          <div className="app-shell">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public */}
                <Route path="/login"    element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected */}
                <Route path="/" element={
                  <ProtectedRoute><HomePage /></ProtectedRoute>
                }/>
                <Route path="/editor" element={
                  <ProtectedRoute><EditorPage /></ProtectedRoute>
                }/>
                <Route path="/editor/:id" element={
                  <ProtectedRoute><EditorPage /></ProtectedRoute>
                }/>
              </Routes>
            </main>
          </div>
        </ResumeProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
