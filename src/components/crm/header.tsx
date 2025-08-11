"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User } from "lucide-react"

interface HeaderProps {
  user: {
    email?: string
    name?: string
  }
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads, accounts, contacts..."
            className="w-96 pl-10"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {process.env.NODE_ENV === "development" && (
          <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-md">
            DEV MODE
          </div>
        )}

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium">{user?.email || "User"}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
