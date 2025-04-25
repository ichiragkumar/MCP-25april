import { createClient } from '@supabase/supabase-js'



export const connectToSupabaseDB = async () => {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
        throw new Error('SUPABASE_URL and SUPABASE_KEY must be set')
    }
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    console.log('Supabase connected')
    return supabase;
}
