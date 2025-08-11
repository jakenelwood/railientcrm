import { NextResponse } from 'next/server'
import { sbServer } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const supabase = await sbServer()
  const body = await req.json() as {
    cardId: string, toStageId: string,
    afterCardId?: string | null, beforeCardId?: string | null
  }
  const { error } = await supabase.rpc('move_card', {
    p_card_id: body.cardId,
    p_to_stage_id: body.toStageId,
    p_after_card_id: body.afterCardId ?? null,
    p_before_card_id: body.beforeCardId ?? null
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}

