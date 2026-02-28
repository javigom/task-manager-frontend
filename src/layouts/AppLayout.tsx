import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Sidebar from '@components/common/Sidebar'
import Header from '@components/common/Header'
import Footer from '@components/common/Footer'


interface AppLayoutProps {
  children: React.ReactNode
  pageTitle?: string
}

export default function AppLayout({ children, pageTitle }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { md: 'calc(100% - 280px)' } }}>
          <Header onMobileMenuClick={handleDrawerToggle} />
          <Container maxWidth="xl" sx={{ flexGrow: 1, pb: 4 }}>
            {pageTitle && (
              <>
                <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
                  <Typography variant="h5" fontWeight={700}>{t(pageTitle)}</Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
              </>
            )}
            {children}
          </Container>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
