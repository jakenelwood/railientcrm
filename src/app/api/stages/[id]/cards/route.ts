import { NextResponse } from 'next/server'
import { sbServer } from '@/lib/supabase-server'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await sbServer()
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('stage_id', id)
    .order('order', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

