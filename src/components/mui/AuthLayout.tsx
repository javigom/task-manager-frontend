import React from 'react'
import Container from '@mui/material/Container'
import Header from './Header'
import Footer from './Footer'
import Box from '@mui/material/Box'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="xl" component="main" sx={{ flex: 1, py: 4, display: 'flex', alignItems: 'center' }}>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
