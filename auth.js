// Supabase se connect karne ke liye zaroori cheezein
const SUPABASE_URL = 'https://anawmgbaztruwxiaupql.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYXdtZ2JhenRydXd4aWF1cHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDYwNzQsImV4cCI6MjA3NDI4MjA3NH0.631QDQmIwWfWnXXowPXS0YtQlMpX89LR-GajXkNOlzk';

// Supabase client banayein
const { createClient } = supabase
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// HTML se form ko pakrein
const signupForm = document.querySelector('#signup-form');

// Check karein ke form mojood hai ya nahi
if (signupForm) {
    // Form submit hone par yeh function chalega
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Page ko reload hone se rokein

        const email = signupForm.querySelector('#email').value;
        const password = signupForm.querySelector('#password').value;

        // Supabase mein naya user banayein
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            // Agar koi error aaye to usay dikhayein
            alert('Error: ' + error.message);
        } else {
            // Agar user kamyabi se ban jaye
            alert('Account kamyabi se ban gaya! Apne email par confirmation check karein.');
            // Form ko khali kar dein
            signupForm.reset();
        }
    });
}

