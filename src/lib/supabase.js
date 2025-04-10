import { createClient } from "@supabase/supabase-js"


export const supabaseUrl = 'https://zsrtvoeoonhhtdghhnhw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcnR2b2Vvb25oaHRkZ2hobmh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTA3MDU2NywiZXhwIjoyMDU2NjQ2NTY3fQ.9WO4-hca-Ljn1WQiqgwqYbG6RI5bh-LZydm_EJumgxI'
export const supabase = createClient(supabaseUrl, supabaseKey)