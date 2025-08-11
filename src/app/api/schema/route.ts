import { NextResponse } from 'next/server'
import { sbServer } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await sbServer()
    
    // Get table information
    const { data: tables, error } = await supabase
      .rpc('get_table_info')
      .select()

    if (error) {
      // Fallback: try to get basic table info
      const { error: pipelineError } = await supabase
        .from('pipelines')
        .select()
        .limit(0)

      const { error: orgError } = await supabase
        .from('organizations')
        .select()
        .limit(0)

      const { error: stageError } = await supabase
        .from('pipeline_stages')
        .select()
        .limit(0)

      const { error: cardError } = await supabase
        .from('cards')
        .select()
        .limit(0)

      return NextResponse.json({
        message: 'Schema info (limited)',
        tables: {
          pipelines: { error: pipelineError?.message, available: !pipelineError },
          organizations: { error: orgError?.message, available: !orgError },
          pipeline_stages: { error: stageError?.message, available: !stageError },
          cards: { error: cardError?.message, available: !cardError }
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      tables 
    })

  } catch (error) {
    console.error('Schema check error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Schema check failed' },
      { status: 500 }
    )
  }
}
