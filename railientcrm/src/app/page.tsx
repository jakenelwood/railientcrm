import { redirect } from "next/navigation"

export default function Home() {
  // In development, go directly to CRM dashboard
  // In production, this will still redirect but the CRM layout will handle auth
  redirect("/crm/dashboard")
}
