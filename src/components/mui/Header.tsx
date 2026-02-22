import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import api from '../../services/api'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'

export default function Header() {
  const { token, logout, checked } = useAuth()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [initial, setInitial] = useState<string | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function handleLangChange(e: any) {
    const l = e.target.value
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    navigate('/profile')
    handleMenuClose()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    handleMenuClose()
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
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Select
              value={i18n.language || 'es'}
              size="small"
              onChange={handleLangChange}
              sx={{ minWidth: 56, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 } }}
            >
              <MenuItem value="es">🇪🇸 ES</MenuItem>
              <MenuItem value="en">🇺🇸 EN</MenuItem>
            </Select>
          {token && checked ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 32, height: 32, cursor: 'pointer' }}>{initial || 'U'}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  sx={{
                    mt: 1,
                    '& .MuiPaper-root': {
                      borderRadius: '12px',
                      minWidth: 180,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t('sidebar.profile')}</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{t('sidebar.logout')}</ListItemText>
                  </MenuItem>
                </Menu>
              </>
          ): <></>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
