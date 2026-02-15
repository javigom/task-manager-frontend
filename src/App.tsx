import React from 'react'
import { Link } from 'react-router-dom'
import AuthStack from './routes/AuthStack'
import AppStack from './routes/AppStack'
import { useAuth } from './context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function App() {
  const { token } = useAuth()
  const { t, i18n } = useTranslation()

  function setLang(l: string) {
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow-sm flex items-center justify-between">
        <h1 className="text-xl font-semibold">{t('app.title')}</h1>
        <div className="flex items-center gap-4">
          <nav>
            {token ? (
              <Link to="/profile" className="text-sm text-blue-600">{t('nav.profile')}</Link>
            ) : null}
          </nav>
          <div>
            <select value={i18n.language} onChange={e => setLang(e.target.value)} className="native-input">
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </header>
      <main className="p-6">
        <AuthStack />
        <AppStack />
      </main>
    </div>
  )
}
