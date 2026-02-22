import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import MuiAuthCard from '../components/MuiAuthCard'
import TextInput from '../components/mui/TextInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '../components/mui/Button'
import Typography from '@mui/material/Typography'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  function toggleShow() {
    setShowPassword(s => !s)
  }

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
    <MuiAuthCard title={t('login.title')}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <TextInput label={t('login.email')} value={email} onChange={e => setEmail(e.target.value)} />
        <TextInput
          label={t('login.password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShow} edge="end" size="small">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button type="submit">{t('login.submit')}</Button>
          {msg && <Typography variant="body2">{msg}</Typography>}
        </div>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link to="/register">{t('login.no_account')}</Link>
        </Typography>
      </form>
    </MuiAuthCard>
  )
}
