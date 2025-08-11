import { NextResponse } from 'next/server'
import { sbServer } from '@/lib/supabase-server'

export async function GET() {
  try {
    const supabase = await sbServer()
    
    // Test basic connection
    const { data, error } = await supabase
      .from('organizations')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json({ 
        error: error.message,
        details: error 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Connection successful',
      data 
    })

  } catch (error) {
    console.error('Connection test error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Connection failed' },
      { status: 500 }
    )
  }
}
