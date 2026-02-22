import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      
      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { md: 'calc(100% - 280px)' } }}>
        {/* Mobile menu button */}
        <AppBar 
          position="static" 
          color="transparent" 
          elevation={0}
          sx={{ display: { md: 'none' }, mb: 2 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Original Header */}
        <Header />
        
        {/* Page content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, pb: 4 }}>
          {children}
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  )
}
