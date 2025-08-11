'use client'

import { useState, useEffect } from 'react'
import { sbBrowser } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const supabase = sbBrowser()

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [mounted])

  const signIn = async () => {
    const supabase = sbBrowser()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) console.error('Error signing in:', error)
  }

  const signOut = async () => {
    const supabase = sbBrowser()
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <div className="animate-pulse bg-gray-200 h-10 w-20 rounded-md"></div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          Welcome, {user.email}
        </span>
        <button
          onClick={signOut}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={signIn}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
    >
      Sign In with GitHub
    </button>
  )
}
