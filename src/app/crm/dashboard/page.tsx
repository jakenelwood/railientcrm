import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Building2,
  UserCheck,
  DollarSign,
  Calendar,
  Target
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Badge variant="outline">CRM Overview</Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New lead created</p>
                  <p className="text-xs text-muted-foreground">John Doe from Acme Corp</p>
                </div>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Deal closed</p>
                  <p className="text-xs text-muted-foreground">$15,000 contract signed</p>
                </div>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Follow-up scheduled</p>
                  <p className="text-xs text-muted-foreground">Meeting with Tech Solutions Inc</p>
                </div>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
              <Users className="h-4 w-4" />
              <span className="text-sm">Add New Lead</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">Create Account</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Schedule Meeting</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md cursor-pointer">
              <Target className="h-4 w-4" />
              <span className="text-sm">View Opportunities</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
