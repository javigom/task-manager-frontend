import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/mui/Button'
import PageCard from '../components/mui/PageCard'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import EmailIcon from '@mui/icons-material/Email'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import api from '../services/api'

export default function Profile() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [user, setUser] = useState<{ full_name?: string; email?: string; created_at?: string } | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await api.get('/auth/me')
        if (mounted) setUser(res.data)
      } catch (e) {
        // ignore
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const displayName = user?.full_name || user?.email || ''
  const initial = displayName ? displayName.trim().charAt(0).toUpperCase() : 'U'
  const created = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
    : ''

  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
        <Typography variant="h5" fontWeight={700}>{t('profile.title')}</Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />

      <PageCard>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar sx={{ width: 56, height: 56, fontSize: 24, bgcolor: 'primary.main' }}>{initial}</Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>{displayName}</Typography>
            {user?.email && (
              <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            )}
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1.5} sx={{ mb: 2.5 }}>
          {user?.full_name && (
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">{user.full_name}</Typography>
            </Stack>
          )}
          {user?.email && (
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">{user.email}</Typography>
            </Stack>
          )}
          {created && (
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">{t('profile.created_at', { date: created })}</Typography>
            </Stack>
          )}
        </Stack>

        <Button onClick={handleLogout} variant="outlined">{t('profile.logout')}</Button>
      </PageCard>
    </>
  )
}
