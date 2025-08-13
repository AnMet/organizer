import { supabase } from '~/utils/supabaseClient'

export async function useSignup(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('❌ Signup error:', error.message)
    return null
  }

  console.log('✅ Signup success:', data)
  return data.user
}
