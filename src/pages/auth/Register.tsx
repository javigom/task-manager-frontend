import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import Typography from '@mui/material/Typography'
import TextInput from '../../components/ui/TextInput'
import Button from '../../components/ui/Button'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'

export default function Register() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { login } = useAuth()

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
    if (password !== confirmPassword) {
      setError(t('register.validation.match'))
      return
    }
    try {
      await api.post('/auth/register', { email, password, full_name: fullName })
      setMsg(t('register.success'))
      // Try to sign in automatically after registration
      try {
        const fd = new FormData()
        fd.set('username', email)
        fd.set('password', password)
        const res2 = await api.post('/auth/token', fd)
        const { access_token } = res2.data
        if (access_token) {
          login(access_token)
          navigate('/')
          return
        }
      } catch (e) {
        // fallback to manual login
      }
      navigate('/login')
    } catch (err: any) {
      const serverMsg = err?.response?.data?.detail || err?.message || t('register.error')
      setError(String(serverMsg))
    }
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      p: 2 
    }}>
      <Card 
        elevation={4}
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 900,
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Left side - Welcome */}
        <Box sx={{
          flex: 1,
          background: 'linear-gradient(135deg, #5B8DEF 0%, #4A6FCC 100%)',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          minHeight: { xs: 200, md: 400 },
          textAlign: 'center'
        }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
            {t('app.title')}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 300 }}>
            {t('register.welcome_message')}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/login')}
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': { 
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {t('login.title')}
          </Button>
        </Box>

        {/* Right side - Form */}
        <Box sx={{
          flex: 1,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
            {t('register.title')}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextInput 
                label={t('register.email')} 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                fullWidth
              />
              <TextInput 
                label={t('register.fullname')} 
                value={fullName} 
                onChange={e => setFullName(e.target.value)}
                fullWidth
              />
              <TextInput 
                label={t('register.password')} 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                helperText={t('register.password_hint')}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(s => !s)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <TextInput
                label={t('register.password_confirm')}
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(s => !s)} edge="end" size="small">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <Button type="submit" fullWidth sx={{ py: 1.5 }}>
                {t('register.submit')}
              </Button>

              {msg && (
                <Alert severity="success" sx={{ py: 0.5 }}>
                  {msg}
                </Alert>
              )}
              
              {error && (
                <Alert severity="error" sx={{ py: 0.5 }}>
                  {error}
                </Alert>
              )}
            </Stack>
          </form>
        </Box>
      </Card>
    </Box>
  )
}
