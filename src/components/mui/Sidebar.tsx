import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DashboardIcon from '@mui/icons-material/Dashboard'

const DRAWER_WIDTH = 280

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const handleNavigation = (path: string) => {
    navigate(path)
    onMobileClose()
  }

  const menuItems = [
    { path: '/', label: t('sidebar.dashboard'), icon: <DashboardIcon /> }
  ]

  const drawerContent = (
    <Box sx={{ 
      height: '100%',
      background: 'linear-gradient(180deg, #F5F7FB 0%, #FFFFFF 100%)',
      display: 'flex',
      flexDirection: 'column',
      pt: 4,
      px: 2
    }}>
      <Box sx={{ mb: 4, px: 1 }}>
        <Typography variant="h6" fontWeight={700} color="primary.main">
          {t('app.title')}
        </Typography>
      </Box>
      
      <List sx={{ px: 0 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  px: 2,
                  transition: 'all 0.2s ease-in-out',
                  backgroundColor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: isSelected ? 'primary.dark' : 'rgba(91, 141, 239, 0.08)',
                    transform: 'translateX(4px)'
                  },
                  '& .MuiListItemIcon-root': {
                    color: isSelected ? 'white' : 'primary.main'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 42 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: '0.95rem'
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            border: 'none'
          }
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            position: 'relative',
            border: 'none',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
            overflow: 'hidden'
          }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  )
}
