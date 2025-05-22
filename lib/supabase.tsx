import { createClient } from '@supabase/supabase-js';


//Brandon
//const url = 'https://jnnsprdbewsjthsolvar.supabase.co'
//const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpubnNwcmRiZXdzanRoc29sdmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NTcwMTEsImV4cCI6MjA2MzAzMzAxMX0.fgpG2e8DC-a7uogEULPfC6lHlSY226jUdRuf0-k5qds'

const url = ''
const key = ''

export const supabase = createClient(url, key,{
    auth:{
        autoRefreshToken: true,
        persistSession:true,
        detectSessionInUrl:false,
    },
});

