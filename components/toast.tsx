"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToastProps {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

interface ToastContextType {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, 'id'>) => void
  removeToast: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = useCallback(({ message, type, duration = 3000 }: Omit<ToastProps, 'id'>) => {
    const id = Date.now()
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }])
    setTimeout(() => removeToast(id), duration)
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const Toast: React.FC<ToastProps & { onClose: () => void }> = ({ message, type, onClose }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-md px-4 py-2 text-white',
        {
          'bg-green-500': type === 'success',
          'bg-red-500': type === 'error',
          'bg-blue-500': type === 'info',
        }
      )}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X size={18} />
      </button>
    </div>
  )
}

