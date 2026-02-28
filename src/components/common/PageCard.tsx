import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { SxProps, Theme } from '@mui/material/styles'

type Props = {
  children: React.ReactNode
  sx?: SxProps<Theme>
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
