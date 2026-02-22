import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTasks, createTask } from '../services/api'
import { useTranslation } from 'react-i18next'
import TextInput from '../components/mui/TextInput'
import Button from '../components/mui/Button'
import TaskCard from '../components/mui/TaskCard'
import PageCard from '../components/mui/PageCard'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

export default function Dashboard() {
  const qc = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks'], queryFn: () => fetchTasks() })
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [created, setCreated] = useState(false)

  const mutation = useMutation({
    mutationFn: ({ title, description }: { title: string; description?: string }) => createTask(title, description),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      setTitle('')
      setDescription('')
      setCreated(true)
      setTimeout(() => setCreated(false), 2500)
    }
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    mutation.mutate({ title: title.trim(), description: description.trim() || undefined })
  }

  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
        <Typography variant="h5" fontWeight={700}>{t('dashboard.title')}</Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', flex: '0 0 320px', maxWidth: { md: '320px' } }}>
          <PageCard>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>{t('dashboard.create')}</Typography>
            <form onSubmit={handleCreate} style={{ display: 'grid', gap: 10 }}>
              <TextInput
                placeholder={t('dashboard.title_placeholder')}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <TextInput
                placeholder={t('dashboard.description_placeholder')}
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                minRows={3}
              />
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending
                    ? <CircularProgress size={16} color="inherit" />
                    : t('dashboard.create_btn')}
                </Button>
              </Stack>
              {created && <Alert severity="success" sx={{ py: 0.5 }}>{t('dashboard.create_success')}</Alert>}
              {mutation.isError && <Alert severity="error" sx={{ py: 0.5 }}>{t('dashboard.create_error')}</Alert>}
            </form>
          </PageCard>
        </Grid>

        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <PageCard sx={{ width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
              <Typography variant="subtitle1" fontWeight={600}>{t('dashboard.tasks_title')}</Typography>
              {data && <Chip label={data.length} size="small" color="primary" />}
            </Stack>
            {isLoading && <Typography color="text.secondary">{t('dashboard.loading')}</Typography>}
            {isError && <Alert severity="error">{t('dashboard.error')}: {(error as any)?.message}</Alert>}
            {!isLoading && data?.length === 0 && (
              <Typography color="text.secondary" sx={{ mt: 1 }}>{t('dashboard.no_tasks')}</Typography>
            )}
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              {data?.map((task: any) => (
                <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} createdAt={task.created_at} />
              ))}
            </Stack>
          </PageCard>
        </Grid>
      </Grid>
    </>
  )
}
