import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem('rb_lang')
    return SUPPORTED_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE
  })

  const t = translations[lang]

  // Apply RTL / LTR and lang attribute on <html> whenever language changes
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir  = t.dir
  }, [lang, t.dir])

  const setLang = useCallback((code) => {
    if (!SUPPORTED_LANGUAGES.includes(code)) return
    localStorage.setItem('rb_lang', code)
    setLangState(code)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: t.dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
