import { createClient } from '@supabase/supabase-js'


export const supabase = createClient("https://meruzhshfyrdowxtwrhg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcnV6aHNoZnlyZG93eHR3cmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3MzA0NTIsImV4cCI6MjAxMjMwNjQ1Mn0.JwUvNOUs5p07_v9OBn_xhu1hwtwUME9gaiiNgDJjH6E")

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)



