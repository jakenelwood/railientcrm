"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Mail, Phone, Building2, DollarSign } from "lucide-react"
import { sbBrowser } from "@/lib/supabase"

// Mock data for demonstration
const mockStages = [
  {
    id: "new",
    title: "New Leads",
    color: "bg-blue-500",
    cards: [
      {
        id: "1",
        title: "John Doe",
        company: "Acme Corp",
        email: "john.doe@acme.com",
        phone: "+1 (555) 123-4567",
        value: "$5,000",
        source: "Website"
      },
      {
        id: "2",
        title: "Sarah Wilson",
        company: "Design Studio",
        email: "sarah@designstudio.com",
        phone: "+1 (555) 234-5678",
        value: "$3,500",
        source: "Referral"
      }
    ]
  },
  {
    id: "contacted",
    title: "Contacted",
    color: "bg-yellow-500",
    cards: [
      {
        id: "3",
        title: "Jane Smith",
        company: "Tech Solutions Inc",
        email: "jane.smith@techsolutions.com",
        phone: "+1 (555) 987-6543",
        value: "$12,000",
        source: "Cold Call"
      }
    ]
  },
  {
    id: "qualified",
    title: "Qualified",
    color: "bg-green-500",
    cards: [
      {
        id: "4",
        title: "Bob Johnson",
        company: "Global Industries",
        email: "bob.johnson@global.com",
        phone: "+1 (555) 456-7890",
        value: "$25,000",
        source: "Trade Show"
      }
    ]
  },
  {
    id: "proposal",
    title: "Proposal Sent",
    color: "bg-purple-500",
    cards: []
  },
  {
    id: "closed",
    title: "Closed Won",
    color: "bg-emerald-500",
    cards: []
  }
]

export function LeadsKanban() {
  const [stages, setStages] = useState(mockStages)
  const [isLoading, setIsLoading] = useState(false)

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    // If dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    setIsLoading(true)

    try {
      const newStages = [...stages]
      const sourceStageIndex = newStages.findIndex(stage => stage.id === source.droppableId)
      const destStageIndex = newStages.findIndex(stage => stage.id === destination.droppableId)

      // Remove card from source
      const [movedCard] = newStages[sourceStageIndex].cards.splice(source.index, 1)

      // Add card to destination
      newStages[destStageIndex].cards.splice(destination.index, 0, movedCard)

      setStages(newStages)

      // Here you would typically update the database
      // const supabase = sbBrowser()
      // await supabase.from('leads').update({
      //   status: destination.droppableId,
      //   position: destination.index
      // }).eq('id', draggableId)

    } catch (error) {
      console.error('Error updating lead:', error)
      // Revert changes on error
      setStages(mockStages)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <h3 className="font-semibold">{stage.title}</h3>
                  <Badge variant="secondary">{stage.cards.length}</Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-3 min-h-[200px] ${
                      snapshot.isDraggingOver ? 'bg-blue-50' : ''
                    }`}
                  >
                    {stage.cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`cursor-pointer hover:shadow-md transition-shadow ${
                              snapshot.isDragging ? 'rotate-2 shadow-lg' : ''
                            }`}
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-2">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Building2 className="h-3 w-3 mr-1" />
                                  {card.company}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {card.email}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {card.phone}
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {card.source}
                                  </Badge>
                                  <div className="flex items-center text-sm font-semibold text-green-600">
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    {card.value.replace('$', '')}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
