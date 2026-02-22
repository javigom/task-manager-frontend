import React, { useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
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
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import ThemeModeContext from '../../context/ThemeModeContext'

export default function Header({ onMobileMenuClick }: { onMobileMenuClick?: () => void }) {
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

  const { mode, toggleMode } = useContext(ThemeModeContext)

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

  const FlagCircle = ({ code, sx }: { code: string; sx?: any }) => {
    const iso = code === 'EN' ? 'gb' : (code || 'ES').toLowerCase()
    const src = `https://hatscripts.github.io/circle-flags/flags/${iso}.svg`
    return (
      <Box sx={theme => ({ width: 20, height: 20, borderRadius: '50%', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: alpha(theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white, 0.06), backgroundColor: 'transparent', ...sx })}>
        <img src={src} alt={iso} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </Box>
    )
  }

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMobileMenuClick}
            sx={{ display: { md: 'none' }, mr: 1 }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Unified control group (pill) */}
        <Box sx={theme => ({
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          bgcolor: alpha(theme.palette.action.selected, 0.04),
          borderRadius: '999px',
          p: '4px',
          height: 40,
        })}>
          <Select
            value={i18n.language || 'es'}
            size="small"
            onChange={handleLangChange}
            IconComponent={() => null}
            renderValue={(val) => {
              const code = String(val) === 'es' ? 'ES' : 'EN'
              const label = String(val) === 'es' ? 'Español' : 'English'
              return (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <FlagCircle code={code} />
                  <Typography variant="body2">{label}</Typography>
                </Box>
              )
            }}
            sx={theme => ({
              minWidth: 'auto',
              width: 'auto',
              height: 32,
              px: 0,
              borderRadius: 1,
              bgcolor: 'transparent',
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 32, px: '6px !important' }
            })}
            inputProps={{ 'aria-label': 'language' }}
          >
            <MenuItem value="es" sx={{ py: 0.5, px: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlagCircle code="ES" />
                <Typography variant="body2">Español</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="en" sx={{ py: 0.5, px: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlagCircle code="EN" />
                <Typography variant="body2">English</Typography>
              </Box>
            </MenuItem>
          </Select>

          <Divider orientation="vertical" flexItem sx={theme => ({ mx: 0.5, my: 0.5, borderColor: alpha(theme.palette.text.primary, 0.12) })} />

          <IconButton onClick={toggleMode} size="small" aria-label="toggle theme" sx={theme => ({ color: theme.palette.text.primary, borderRadius: 1, width: 36, height: 32, p: 0, '&:hover': { bgcolor: alpha(theme.palette.action.selected, 0.12) } })}>
            {mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </IconButton>

          {token && checked ? (
            <>
              <Divider orientation="vertical" flexItem sx={theme => ({ mx: 0.5, my: 0.5, borderColor: alpha(theme.palette.text.primary, 0.12) })} />
              <IconButton onClick={handleMenuOpen} sx={theme => ({ p: 0, ml: 0, width: 36, height: 32, borderRadius: 1, '&:hover': { bgcolor: alpha(theme.palette.action.selected, 0.12) } })}>
                <Avatar sx={{ width: 26, height: 26, cursor: 'pointer', mx: 'auto' }}>{initial || 'U'}</Avatar>
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
          ) : <></>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
