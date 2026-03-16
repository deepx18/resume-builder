import { Routes, Route } from 'react-router-dom'
import { ResumeProvider } from './context/ResumeContext'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <ResumeProvider>
      <div className="app-shell">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/editor"   element={<EditorPage />} />
            <Route path="/editor/:id" element={<EditorPage />} />
          </Routes>
        </main>
      </div>
    </ResumeProvider>
  )
}
