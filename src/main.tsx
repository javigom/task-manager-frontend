import React, { useMemo, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { AuthProvider } from '@context/AuthContext'
import getTheme from '@config/theme'
import { ThemeModeContext } from '@context/ThemeModeContext'

import App from './App'
import './index.css'
import './i18n/index'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerThemeProvider />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

function InnerThemeProvider() {
  const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'light'
  const [mode, setMode] = useState<'light' | 'dark'>(stored === 'dark' ? 'dark' : 'light')
  const toggleMode = () => {
    setMode((m) => {
      const nm = m === 'light' ? 'dark' : 'light'
      try { localStorage.setItem('theme', nm) } catch (e) {}
      return nm
    })
  }
  const theme = useMemo(() => getTheme(mode), [mode])
  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
