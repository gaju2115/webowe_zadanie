import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwfqtufnoevxgzuyaavr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3ZnF0dWZub2V2eGd6dXlhYXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTIyOTUsImV4cCI6MjA2NDUyODI5NX0.Er7t7Cz-vjAT-d8FG1fveeuxOcNByAmBLSNj2IVQdnk'


export const supabase = createClient(supabaseUrl, supabaseKey)
