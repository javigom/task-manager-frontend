import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import ProtectedRoute from './ProtectedRoute'
import NotFound from '../pages/NotFound'
export default function AppStack() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
    </Routes>
  )
}
