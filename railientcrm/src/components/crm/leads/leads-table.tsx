"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

// Mock data for demonstration
const mockLeads = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    company: "Acme Corp",
    email: "john.doe@acme.com",
    phone: "+1 (555) 123-4567",
    status: "NEW",
    source: "Website",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    company: "Tech Solutions Inc",
    email: "jane.smith@techsolutions.com",
    phone: "+1 (555) 987-6543",
    status: "CONTACTED",
    source: "Referral",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Johnson",
    company: "Global Industries",
    email: "bob.johnson@global.com",
    phone: "+1 (555) 456-7890",
    status: "QUALIFIED",
    source: "Cold Call",
    createdAt: "2024-01-13",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "NEW":
      return "bg-blue-100 text-blue-800"
    case "CONTACTED":
      return "bg-yellow-100 text-yellow-800"
    case "QUALIFIED":
      return "bg-green-100 text-green-800"
    case "LOST":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function LeadsTable() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">
                {lead.firstName} {lead.lastName}
              </TableCell>
              <TableCell>{lead.company}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>{lead.createdAt}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
