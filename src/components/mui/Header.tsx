import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import api from '../../services/api'
import Stack from '@mui/material/Stack'
import { Link as RouterLink } from 'react-router-dom'
import Button from './Button'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { token, logout, checked } = useAuth()
  const { t, i18n } = useTranslation()
  const [initial, setInitial] = useState<string | null>(null)
  function handleLangChange(e: any) {
    const l = e.target.value
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!token) {
        setInitial(null)
        return
      }
      try {
        const res = await api.get('/auth/me')
        const name = res.data.full_name || res.data.email || ''
        const initialChar = name ? String(name).trim().charAt(0).toUpperCase() : ''
        if (mounted) setInitial(initialChar || null)
      } catch (e) {
        // ignore — AuthContext handles token validity elsewhere
      }
    }
    load()
    return () => { mounted = false }
  }, [token])

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
            {t('app.title')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {token && checked ? (
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar component={RouterLink} to="/profile" sx={{ width: 32, height: 32, textDecoration: 'none' }}>{initial || 'U'}</Avatar>
                <Select value={i18n.language || 'es'} size="small" onChange={handleLangChange} sx={{ minWidth: 80 }}>
                  <MenuItem value="es">🇪🇸 Español</MenuItem>
                  <MenuItem value="en">🇺🇸 English</MenuItem>
                </Select>
              </Stack>
            </>
          ) : (
            <Select value={i18n.language || 'es'} size="small" onChange={handleLangChange} sx={{ minWidth: 80 }}>
              <MenuItem value="es">🇪🇸 Español</MenuItem>
              <MenuItem value="en">🇺🇸 English</MenuItem>
            </Select>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
