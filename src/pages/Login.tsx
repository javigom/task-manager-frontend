import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import TextInput from '../components/ui/TextInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '../components/ui/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  function toggleShow() {
    setShowPassword(s => !s)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    setError(false)
    try {
      const fd = new FormData()
      fd.set('username', email)
      fd.set('password', password)
      const res = await api.post('/auth/token', fd)
      const { access_token } = res.data
      login(access_token)
      setMsg(t('login.success'))
      setError(false)
      navigate('/')
    } catch (err: any) {
      setMsg(t('login.error'))
      setError(true)
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
            {t('login.welcome_message')}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/register')}
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': { 
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {t('login.register')}
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
            {t('login.title')}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextInput 
                label={t('login.email')} 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                fullWidth
              />
              <TextInput
                label={t('login.password')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
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
              
              <Button type="submit" fullWidth sx={{ py: 1.5 }}>
                {t('login.submit')}
              </Button>

              {msg && (
                <Alert severity={error ? 'error' : 'success'} sx={{ py: 0.5 }}>
                  {msg}
                </Alert>
              )}
            </Stack>
          </form>
        </Box>
      </Card>
    </Box>
  )
}
