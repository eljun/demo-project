"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { storage } from "@/lib/storage"
import { User } from "@/types"

const DUMMY_EMAIL = "user@example.com"
const DUMMY_PASSWORD = "password123"
const AUTH_STORAGE_KEY = "todo-app-auth"

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = storage.get<User | null>(AUTH_STORAGE_KEY, null)
    setUser(storedUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      const newUser: User = { email }
      setUser(newUser)
      storage.set(AUTH_STORAGE_KEY, newUser)
      return { success: true }
    }
    return { success: false, error: "Invalid email or password" }
  }

  const logout = () => {
    setUser(null)
    storage.remove(AUTH_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
