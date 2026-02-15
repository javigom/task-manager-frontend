import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function decodeToken(token: string | null) {
  if (!token) return null
  try {
    const part = token.split('.')[1]
    const decoded = atob(part.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(decoded)))
  } catch {
    return null
  }
}

export default function Profile() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const payload = decodeToken(token)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold">{t('profile.title')}</h2>
      <p className="mt-2">{payload?.sub ? t('profile.user', { user: payload.sub }) : t('profile.user', { user: '' })}</p>
      <div className="mt-4">
        <button onClick={handleLogout} className="native-button">{t('profile.logout')}</button>
      </div>
    </div>
  )
}
