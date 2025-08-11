import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Table, Kanban } from "lucide-react"
import { LeadsTable } from "@/components/crm/leads/leads-table"
import { LeadsKanban } from "@/components/crm/leads/leads-kanban"

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track your sales leads
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <Table className="h-4 w-4" />
            Table View
          </TabsTrigger>
          <TabsTrigger value="kanban" className="flex items-center gap-2">
            <Kanban className="h-4 w-4" />
            Kanban Board
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leads Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading leads...</div>}>
                <LeadsTable />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leads Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading kanban board...</div>}>
                <LeadsKanban />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
