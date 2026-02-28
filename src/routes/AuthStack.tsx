import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '@pages/auth/Login'
import Register from '@pages/auth/Register'
import AuthLayout from '@layouts/AuthLayout'

export default function AuthStack() {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
    </Routes>
  )
}
