import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AssignmentIcon from '@mui/icons-material/Assignment'

type Task = { id: number; title: string; description?: string; createdAt?: string }

export default function TaskCard({ id, title, description, createdAt }: Task) {
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
    : null

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: '8px',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 4 }
      }}
    >
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <Box sx={{ color: 'primary.main', mt: 0.3, flexShrink: 0 }}>
            <AssignmentIcon fontSize="small" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle2" fontWeight={600} noWrap>{title}</Typography>
              {dateStr && (
                <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>{dateStr}</Typography>
              )}
            </Box>
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
