// Supabase se connect karne ke liye zaroori cheezein
const SUPABASE_URL = 'https://anawmgbaztruwxiaupql.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuYXdtZ2JhenRydXd4aWF1cHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDYwNzQsImV4cCI6MjA3NDI4MjA3NH0.631QDQmIwWfWnXXowPXS0YtQlMpX89LR-GajXkNOlzk';

// Supabase client banayein
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// HTML se forms, buttons, aur doosre elements ko pakrein
const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');
const logoutButton = document.querySelector('#logout-button');
const userEmailSpan = document.querySelector('#user-email');

// --- DASHBOARD LOGIC (Naya Code) ---
// Check karein ke hum dashboard page par hain (userEmailSpan ki mojoodgi se)
if (userEmailSpan) {
    // User ka data hasil karne ke liye ek function banayein
    async function getUser() {
        const { data, error } = await supabaseClient.auth.getUser();
        
        if (error) {
            console.error('User hasil karne mein error:', error);
            // Agar user login nahi hai, to usay login page par bhej dein
            window.location.href = "login.html";
        } else if (data.user) {
            // Agar user login hai, to uska email page par dikhayein
            userEmailSpan.textContent = data.user.email;
        } else {
            // Agar kisi aur wajah se user nahi milta, to bhi login page par bhej dein
             window.location.href = "login.html";
        }
    }
    // Page load hotay hi is function ko chalayein
    getUser();
}


// --- SIGN UP LOGIC ---
// Check karein ke signup form is page par mojood hai
if (signupForm) {
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
            alert('Error: ' + error.message);
        } else {
            alert('Account kamyabi se ban gaya! Ab aap login kar sakte hain.');
            signupForm.reset(); // Form ko khali kar dein
        }
    });
}

// --- LOGIN LOGIC ---
// Check karein ke login form is page par mojood hai
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = loginForm.querySelector('#email').value;
        const password = loginForm.querySelector('#password').value;

        // Supabase mein user ko login karwayein
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert('Error: ' + error.message);
        } else {
            // Kamyab login ke baad dashboard par bhej dein
            window.location.href = "dashboard.html";
        }
    });
}

// --- LOGOUT LOGIC ---
// Check karein ke logout button is page par mojood hai
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        // Logout ke baad wapas home page par bhej dein
        window.location.href = "index.html";
    });
}

