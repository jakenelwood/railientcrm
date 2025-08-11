"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  Target,
  CheckSquare,
  FileText,
  Settings,
  LogOut
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/crm/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/crm/leads",
    icon: Users,
  },
  {
    name: "Accounts",
    href: "/crm/accounts",
    icon: Building2,
  },
  {
    name: "Contacts",
    href: "/crm/contacts",
    icon: UserCheck,
  },
  {
    name: "Opportunities",
    href: "/crm/opportunities",
    icon: Target,
  },
  {
    name: "Tasks",
    href: "/crm/tasks",
    icon: CheckSquare,
  },
  {
    name: "Contracts",
    href: "/crm/contracts",
    icon: FileText,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50 border-r">
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-xl font-bold">RailientCRM</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-3">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
