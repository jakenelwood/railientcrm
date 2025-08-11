import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST() {
  try {
    // Use service role key to bypass RLS for seeding
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Create a sample organization first
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: 'Sample Company' })
      .select()
      .single()

    if (orgError) throw orgError

    // Create a sample pipeline (using org_id and created_by)
    const { data: pipeline, error: pipelineError } = await supabase
      .from('pipelines')
      .insert({
        name: 'Sales Pipeline',
        org_id: org.id,
        created_by: org.id // Using org.id as a placeholder for created_by
      })
      .select()
      .single()

    if (pipelineError) throw pipelineError

    // Create sample stages
    const stages = [
      { name: 'Lead', color: '#3B82F6', order: 1 },
      { name: 'Qualified', color: '#10B981', order: 2 },
      { name: 'Proposal', color: '#F59E0B', order: 3 },
      { name: 'Closed Won', color: '#059669', order: 4 },
      { name: 'Closed Lost', color: '#DC2626', order: 5 }
    ]

    const { data: createdStages, error: stagesError } = await supabase
      .from('pipeline_stages')
      .insert(
        stages.map(stage => ({
          ...stage,
          pipeline_id: pipeline.id,
          org_id: org.id
        }))
      )
      .select()

    if (stagesError) throw stagesError

    // Create sample cards
    const sampleCards = [
      {
        title: 'Acme Corp - Website Redesign',
        description: 'Potential $50k project for complete website overhaul',
        stage_id: createdStages[0].id,
        order: 1
      },
      {
        title: 'TechStart Inc - Mobile App',
        description: 'iOS and Android app development - $75k budget',
        stage_id: createdStages[0].id,
        order: 2
      },
      {
        title: 'Global Solutions - CRM Integration',
        description: 'Salesforce integration project - $30k',
        stage_id: createdStages[1].id,
        order: 1
      },
      {
        title: 'Innovation Labs - AI Platform',
        description: 'Machine learning platform development - $120k',
        stage_id: createdStages[2].id,
        order: 1
      },
      {
        title: 'StartupXYZ - MVP Development',
        description: 'Complete MVP for fintech startup - $85k',
        stage_id: createdStages[3].id,
        order: 1
      }
    ]

    const { error: cardsError } = await supabase
      .from('cards')
      .insert(
        sampleCards.map(card => ({
          ...card,
          org_id: org.id
        }))
      )

    if (cardsError) throw cardsError

    return NextResponse.json({ 
      success: true, 
      message: 'Sample data created successfully',
      organizationId: org.id,
      pipelineId: pipeline.id
    })

  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to seed data' },
      { status: 500 }
    )
  }
}
