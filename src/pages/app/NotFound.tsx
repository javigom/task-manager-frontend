import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Button from '@components/common/Button'

export default function NotFound() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', py: 8 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        {t('notfound.title')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        {t('notfound.message')}
      </Typography>
      <Button onClick={() => navigate('/')}>
        {t('notfound.home')}
      </Button>
    </Box>
  )
}
