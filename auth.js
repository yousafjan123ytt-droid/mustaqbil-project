// Supabase se connect karne ke liye zaroori cheezein
const SUPABASE_URL = 'https://anawmgbaztruwxiaupql.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYXdtZ2JhenRydXd4aWF1cHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDYwNzQsImV4cCI6MjA3NDI4MjA3NH0.631QDQmIwWfWnXXowPXS0YtQlMpX89LR-GajXkNOlzk';

// Supabase client banayein
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// HTML se forms aur buttons ko pakrein
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const logoutButton = document.querySelector('#logout-button');

// --- SIGN UP LOGIC ---
if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = signupForm.querySelector('#email').value;
        const password = signupForm.querySelector('#password').value;

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            alert('Error: ' + error.message);
        } else {
            alert('Account kamyabi se ban gaya! Apne email par confirmation check karein.');
            signupForm.reset();
        }
    });
}

// --- LOGIN LOGIC ---
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = loginForm.querySelector('#email').value;
        const password = loginForm.querySelector('#password').value;

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert('Error: ' + error.message);
        } else {
            window.location.href = "dashboard.html";
        }
    });
}

// --- LOGOUT LOGIC (Naya Code) ---
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            alert('Error logging out: ' + error.message);
        } else {
            // Logout kamyab ho to wapas home page par bhej dein
            window.location.href = "index.html";
        }
    });
}

