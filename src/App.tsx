import React from 'react'
import { Link } from 'react-router-dom'
import AuthStack from './routes/AuthStack'
import AppStack from './routes/AppStack'
import { useAuth } from './context/AuthContext'
import { useTranslation } from 'react-i18next'
import Header from './components/mui/Header'
import AppContainer from './components/mui/Container'
import Footer from './components/mui/Footer'

export default function App() {
  const { token } = useAuth()
  const { t, i18n } = useTranslation()

  function setLang(l: string) {
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <AppContainer component="main" sx={{ flex: 1 }}>
        <div style={{ marginTop: 8 }}>
          <AuthStack />
          <AppStack />
        </div>
      </AppContainer>
      <Footer />
    </div>
  )
}
