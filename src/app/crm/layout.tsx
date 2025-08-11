import { sbServer } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/crm/sidebar"
import { Header } from "@/components/crm/header"

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Skip authentication in development mode
  if (process.env.NODE_ENV === "development") {
    const mockUser = {
      email: "dev@example.com",
      name: "Development User",
      id: "dev-user-id"
    }

    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Header user={mockUser} />
          <div className="flex-grow overflow-y-auto h-full p-6">
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Production authentication flow
  try {
    const supabase = await sbServer()

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      redirect("/auth/login")
    }

    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Header user={user} />
          <div className="flex-grow overflow-y-auto h-full p-6">
            {children}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    redirect("/auth/login")
  }
}
