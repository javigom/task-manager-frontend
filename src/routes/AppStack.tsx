import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/app/Dashboard'
import Profile from '../pages/app/Profile'
import NotFound from '../pages/app/NotFound'

export default function AppStack() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
