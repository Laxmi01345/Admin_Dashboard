"use client"

import { useState } from "react"
import { useAuth } from "./auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function LoginForm({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, login, logout } = useAuth()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(username, password)
    if (success) {
      toast({
        title: "Logged in successfully",
        description: "Welcome to the admin dashboard",
      })
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      })
    }
  }

  if (user) {
    return (
      <div>
        {children}
        <Button onClick={logout} className="mt-4">Logout</Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" onClick={handleLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

