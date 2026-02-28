import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@pages/auth/Login'
import Register from '@pages/auth/Register'
import Dashboard from '@pages/app/Dashboard'
import Profile from '@pages/app/Profile'
import NotFound from '@pages/app/NotFound'
import AuthLayout from '@layouts/AuthLayout'
import AppLayout from '@layouts/AppLayout'
import RequireAuth from '@routes/RequireAuth'
import RequireNoAuth from '@routes/RequireNoAuth'

export default function App() {
  return (
    <Routes>
      <Route element={<RequireNoAuth />}>
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/" element={<AppLayout pageTitle="dashboard.title"><Dashboard /></AppLayout>} />
        <Route path="/profile" element={<AppLayout pageTitle="profile.title"><Profile /></AppLayout>} />
        <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
