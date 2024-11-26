"use client"

import React, { createContext, useState, useContext } from 'react'

type User = {
  id: number
  username: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (username: string, password: string) => {
    // This is a mock login. In a real application, you would make an API call here.
    if (username === 'admin' && password === 'password') {
      setUser({ id: 1, username: 'admin', name: 'Admin User', email: 'admin@example.com', role: 'Admin' })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

