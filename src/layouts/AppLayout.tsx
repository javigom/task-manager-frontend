import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Sidebar from '../components/ui/Sidebar'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'


interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sidebar + content row */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

        {/* Main content area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { md: 'calc(100% - 280px)' } }}>
          <Header onMobileMenuClick={handleDrawerToggle} />

          <Container maxWidth="xl" sx={{ flexGrow: 1, pb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>

      {/* Footer — full width, below sidebar + content */}
      <Footer />
    </Box>
  )
}
