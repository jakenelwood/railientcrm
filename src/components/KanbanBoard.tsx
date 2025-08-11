'use client'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

interface Card {
  id: string
  title: string
  description?: string
  stage_id: string
  order: number
  created_at: string
  updated_at: string
  custom_fields?: Record<string, unknown>
}

interface Stage {
  id: string
  name: string
  color: string
  order: number
  pipeline_id: string
  cards: Card[]
}

interface Pipeline {
  id: string
  name: string
  stages: Stage[]
}

export function KanbanBoard() {
  const [pipeline, setPipeline] = useState<Pipeline | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      loadPipeline()
    }
  }, [mounted])

  const loadPipeline = async () => {
    try {
      // For demo purposes, use static data
      const demoData: Pipeline = {
        id: 'demo-pipeline',
        name: 'Sales Pipeline',
        stages: [
          {
            id: 'stage-1',
            name: 'Lead',
            color: '#3B82F6',
            order: 1,
            pipeline_id: 'demo-pipeline',
            cards: [
              {
                id: 'card-1',
                title: 'Acme Corp - Website Redesign',
                description: 'Potential $50k project for complete website overhaul',
                stage_id: 'stage-1',
                order: 1,
                created_at: '2025-01-01T00:00:00Z',
                updated_at: '2025-01-01T00:00:00Z'
              },
              {
                id: 'card-2',
                title: 'TechStart Inc - Mobile App',
                description: 'iOS and Android app development - $75k budget',
                stage_id: 'stage-1',
                order: 2,
                created_at: '2025-01-01T00:00:00Z',
                updated_at: '2025-01-01T00:00:00Z'
              }
            ]
          },
          {
            id: 'stage-2',
            name: 'Qualified',
            color: '#10B981',
            order: 2,
            pipeline_id: 'demo-pipeline',
            cards: [
              {
                id: 'card-3',
                title: 'Global Solutions - CRM Integration',
                description: 'Salesforce integration project - $30k',
                stage_id: 'stage-2',
                order: 1,
                created_at: '2025-01-01T00:00:00Z',
                updated_at: '2025-01-01T00:00:00Z'
              }
            ]
          },
          {
            id: 'stage-3',
            name: 'Proposal',
            color: '#F59E0B',
            order: 3,
            pipeline_id: 'demo-pipeline',
            cards: [
              {
                id: 'card-4',
                title: 'Innovation Labs - AI Platform',
                description: 'Machine learning platform development - $120k',
                stage_id: 'stage-3',
                order: 1,
                created_at: '2025-01-01T00:00:00Z',
                updated_at: '2025-01-01T00:00:00Z'
              }
            ]
          },
          {
            id: 'stage-4',
            name: 'Closed Won',
            color: '#059669',
            order: 4,
            pipeline_id: 'demo-pipeline',
            cards: [
              {
                id: 'card-5',
                title: 'StartupXYZ - MVP Development',
                description: 'Complete MVP for fintech startup - $85k',
                stage_id: 'stage-4',
                order: 1,
                created_at: '2025-01-01T00:00:00Z',
                updated_at: '2025-01-01T00:00:00Z'
              }
            ]
          },
          {
            id: 'stage-5',
            name: 'Closed Lost',
            color: '#DC2626',
            order: 5,
            pipeline_id: 'demo-pipeline',
            cards: []
          }
        ]
      }

      setPipeline(demoData)
    } catch (err) {
      console.error('Error loading pipeline:', err)
      setError(err instanceof Error ? err.message : 'Failed to load pipeline')
    } finally {
      setLoading(false)
    }
  }

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination || !pipeline) return

    // If dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const sourceStage = pipeline.stages.find(s => s.id === source.droppableId)
    const destStage = pipeline.stages.find(s => s.id === destination.droppableId)

    if (!sourceStage || !destStage) return

    // Create optimistic update
    const newPipeline = { ...pipeline }
    const newSourceStage = { ...sourceStage, cards: [...sourceStage.cards] }
    const newDestStage = sourceStage.id === destStage.id ? newSourceStage : { ...destStage, cards: [...destStage.cards] }

    // Remove card from source
    const [movedCard] = newSourceStage.cards.splice(source.index, 1)

    // Add card to destination
    newDestStage.cards.splice(destination.index, 0, { ...movedCard, stage_id: destination.droppableId })

    // Update pipeline state
    newPipeline.stages = newPipeline.stages.map(stage => {
      if (stage.id === newSourceStage.id) return newSourceStage
      if (stage.id === newDestStage.id) return newDestStage
      return stage
    })

    setPipeline(newPipeline)

    // Calculate afterCardId and beforeCardId
    const afterCardId = destination.index > 0 ? newDestStage.cards[destination.index - 1]?.id : null
    const beforeCardId = destination.index < newDestStage.cards.length - 1 ? newDestStage.cards[destination.index + 1]?.id : null

    try {
      const response = await fetch('/api/cards/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: draggableId,
          toStageId: destination.droppableId,
          afterCardId,
          beforeCardId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to move card')
      }
    } catch (err) {
      console.error('Error moving card:', err)
      // Rollback optimistic update
      loadPipeline()
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading pipeline...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!pipeline) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No pipeline found</div>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-6">
        {pipeline.stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{stage.name}</h3>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {stage.cards.length}
                  </span>
                </div>
              </div>
              
              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-4 min-h-[200px] ${
                      snapshot.isDraggingOver ? 'bg-blue-50' : ''
                    }`}
                  >
                    {stage.cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white border rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-shadow ${
                              snapshot.isDragging ? 'shadow-lg' : ''
                            }`}
                          >
                            <h4 className="font-medium text-gray-900 mb-1">{card.title}</h4>
                            {card.description && (
                              <p className="text-sm text-gray-600 mb-2">{card.description}</p>
                            )}
                            <div className="text-xs text-gray-400">
                              {new Date(card.created_at).toLocaleDateString()}
                            </div>
                          </div>
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
