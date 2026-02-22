import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MuiAuthCard from '../components/MuiAuthCard'
import Typography from '@mui/material/Typography'
import TextInput from '../components/mui/TextInput'
import Button from '../components/mui/Button'

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
    <MuiAuthCard title={t('register.title')}>
      <form onSubmit={handleSubmit}>
        <TextInput label={t('register.email')} value={email} onChange={e => setEmail(e.target.value)} />
        <TextInput label={t('register.fullname')} value={fullName} onChange={e => setFullName(e.target.value)} />
        <TextInput label={t('register.password')} type="password" value={password} onChange={e => setPassword(e.target.value)} helperText={t('register.password_hint')} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
          <Button type="submit">{t('register.submit')}</Button>
        </div>
        {msg && <p style={{ color: 'green' }}>{msg}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link to="/login">{t('register.have_account')}</Link>
        </Typography>
      </form>
    </MuiAuthCard>
  )
}
