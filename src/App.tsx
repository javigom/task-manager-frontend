import React from 'react'
import AuthStack from './routes/AuthStack'
import AppStack from './routes/AppStack'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { token } = useAuth()
  return token ? <AppStack /> : <AuthStack />
}
