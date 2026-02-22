import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

type Props = {
  children: React.ReactNode
  sx?: any
}

export default function PageCard({ children, sx }: Props) {
  return (
    <Card elevation={2} sx={{ borderRadius: '12px', p: 0, height: '100%', ...sx }}>
      <CardContent sx={{ p: 2 }}>
        {children}
      </CardContent>
    </Card>
  )
}
