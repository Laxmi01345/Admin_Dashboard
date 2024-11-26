"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Users, UserCircle, Shield, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <Home className="mr-2 h-4 w-4" /> },
  { label: 'User Management', href: '/users', icon: <Users className="mr-2 h-4 w-4" /> },
  { label: 'Role Management', href: '/roles', icon: <UserCircle className="mr-2 h-4 w-4" /> },
  { label: 'Permission Management', href: '/permissions', icon: <Shield className="mr-2 h-4 w-4" /> },
]

export function SideNavbar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex flex-col items-center justify-center p-6 border-b border-gray-800">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">Admin User</h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="px-4 py-2">
              <Link href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <Button variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  )
}

