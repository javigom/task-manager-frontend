import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Register() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  function validatePassword(p: string) {
    if (p.length < 8) return t('register.validation.min_length')
    if (new TextEncoder().encode(p).length > 72) return t('register.validation.max_length')
    if (!/[A-Z]/.test(p)) return t('register.validation.uppercase')
    if (!/[a-z]/.test(p)) return t('register.validation.lowercase')
    if (!/\d/.test(p)) return t('register.validation.digit')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    setError(null)
    const v = validatePassword(password)
    if (v) {
      setError(v)
      return
    }
    try {
      const res = await api.post('/auth/register', { email, password, full_name: fullName })
      setMsg(t('register.success'))
      setTimeout(() => navigate('/login'), 900)
    } catch (err: any) {
      // show server validation if available
      const serverMsg = err?.response?.data?.detail || err?.message || t('register.error')
      setError(String(serverMsg))
    }
  }

  return (
    <div className="auth-center">
      <div className="glitter-box bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-lg font-medium mb-4">{t('register.title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block">{t('register.email')}</label>
            <input className="native-input mt-1 w-full" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block">{t('register.fullname')}</label>
            <input className="native-input mt-1 w-full" value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="block">{t('register.password')}</label>
            <input type="password" className="native-input mt-1 w-full" value={password} onChange={e => setPassword(e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">{t('register.password_hint')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="native-button">{t('register.submit')}</button>
            <Link to="/login" className="text-sm text-blue-600">{t('nav.login')}</Link>
          </div>
          {msg && <p className="text-sm text-green-600">{msg}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  )
}
