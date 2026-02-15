import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTasks, createTask } from '../services/api'
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const qc = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['tasks'], queryFn: () => fetchTasks() })
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const mutation = useMutation({
    mutationFn: ({ title, description }: { title: string; description?: string }) => createTask(title, description),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      setTitle('')
      setDescription('')
    }
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    mutation.mutate({ title: title.trim(), description: description.trim() || undefined })
  }

  return (
    <div className="auth-center">
      <div className="glitter-box bg-white p-6 rounded shadow max-w-3xl w-full">
        <h2 className="text-xl font-semibold">{t('dashboard.title')}</h2>

        <section className="mt-4">
          <h3 className="font-medium">{t('dashboard.create')}</h3>
          <form onSubmit={handleCreate} className="mt-2 space-y-2">
            <div>
              <input className="native-input w-full" placeholder={t('dashboard.title_placeholder')} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <textarea className="native-input w-full" placeholder={t('dashboard.description_placeholder')} value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
              <button type="submit" className="native-button">{t('dashboard.create_btn')}</button>
              {mutation.isPending && <span className="ml-2 text-sm">{t('dashboard.create_btn')}...</span>}
            </div>
          </form>
        </section>

        <section className="mt-6">
          <h3 className="font-medium">{t('dashboard.tasks_title')}</h3>
          {isLoading && <p className="text-sm text-gray-600">{t('dashboard.loading')}</p>}
          {isError && <p className="text-sm text-red-600">{t('dashboard.error')}: {(error as any)?.message}</p>}
          {!isLoading && data && data.length === 0 && <p className="text-sm text-gray-600">{t('dashboard.no_tasks')}</p>}
          <ul className="mt-3 space-y-3">
            {data && data.map((t: any) => (
              <li key={t.id} className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center justify-between">
                  <strong>{t.title}</strong>
                  <small className="text-gray-500 text-sm">#{t.id}</small>
                </div>
                {t.description && <p className="text-sm text-gray-600 mt-1">{t.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
