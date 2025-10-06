// Yeh file hamari website ka "Control Room" hai.
// Tamam Supabase keys yahan mehfooz rahengi.
const SUPABASE_URL = 'https://anawmgbaztruwxiaupql.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYXdtZ2JhenRydXd4aWF1cHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDYwNzQsImV4cCI6MjA3NDIyMjA3NH0.631QDQmIwWfWnXXowPXS0YtQlMpX89LR-GajXkNOlzk';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- CONNECTION TEST ---
// Yeh line check karegi ke client theek se bana hai ya nahi.
console.log('Supabase Client Object:', supabaseClient);
// --------------------

// Is client ko doosri files mein istemal karne ke liye export karein
export { supabaseClient };

