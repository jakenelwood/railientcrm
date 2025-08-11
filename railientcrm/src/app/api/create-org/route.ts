import { NextResponse } from 'next/server'
import { sbServer } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const { name } = await req.json()
  const supabase = await sbServer()
  const { data: { user }, error: userErr } = await supabase.auth.getUser()
  if (userErr || !user) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 })

  const { data, error } = await supabase.rpc('create_org_on_signup', { p_name: name })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ orgId: data })
}

