// Yeh file hamari website ka "Control Room" hai.
// Tamam Supabase keys yahan mehfooz rahengi.
const SUPABASE_URL = 'https://anawmgbaztruwxiaupql.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYXdtZ2JhenRydXd4aWF1cHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDYwNzQsImV4cCI6MjA3NDIyMjA3NH0.631QDQmIwWfWnXXowPXS0YtQlMpX89LR-GajXkNOlzk';

// Supabase library se 'createClient' function nikalein
// Yeh function HTML mein <script> tag se aa raha hai
const { createClient } = supabase;

// Supabase se connect karne ke liye client banayein
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Is client ko doosri files (jaise auth.js, listings.js) mein istemal karne ke liye export karein
export { supabaseClient };

