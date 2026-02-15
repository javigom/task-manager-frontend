import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useTranslation()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.set('username', email)
      fd.set('password', password)
      const res = await api.post('/auth/token', fd)
      const { access_token } = res.data
      login(access_token)
      setMsg(t('login.success'))
      navigate('/')
    } catch (err: any) {
      setMsg(t('login.error'))
    }
  }

  return (
    <div className="auth-center">
      <div className="glitter-box bg-white p-6 rounded shadow max-w-md w-full">
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="text-lg font-medium mb-4">{t('login.title')}</h2>
          <div>
            <label className="block">{t('login.email')}</label>
            <input className="native-input mt-1 w-full" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block">{t('login.password')}</label>
            <input type="password" className="native-input mt-1 w-full" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <button className="native-button">{t('login.submit')}</button>
            {msg && <p className="text-sm">{msg}</p>}
            <Link to="/register" className="text-sm text-blue-600">{t('login.register')}</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
