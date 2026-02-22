import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

type Props = {
  title?: string
  children: React.ReactNode
}

export default function MuiAuthCard({ title, children }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, pt: 4 }}>
      <Card elevation={3} sx={{ width: '100%', maxWidth: 420, p: 0 }}>
        <CardContent>
          {title && <h2 style={{ margin: 0, marginBottom: 12 }}>{title}</h2>}
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}
