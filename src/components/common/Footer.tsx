import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <Box component="footer" sx={{ mt: 4, py: 2, textAlign: 'center', color: 'text.secondary', borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2">
        {t('footer.developed_by')}{' '}
        <Link href="https://github.com/javigom" target="_blank" rel="noopener noreferrer" underline="hover">
          javigom
        </Link>
        {' — '}© {new Date().getFullYear()} Task Manager
      </Typography>
    </Box>
  )
}
