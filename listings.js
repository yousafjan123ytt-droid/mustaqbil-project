// Control Room se supabase client ko import karein
import { supabaseClient } from './config.js';

// --- JOBS DATA NIKALNE KA FUNCTION ---
async function fetchJobs() {
    const container = document.querySelector('#jobs-container');
    if (!container) return;
    container.innerHTML = '<p class="loading-message">Naukriyan load ho rahi hain...</p>';
    
    const { data, error } = await supabaseClient.from('jobs').select('*').order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = '<p class="error-message">Data load karne mein masla hua.</p>';
        return;
    }
    if (data.length === 0) {
        container.innerHTML = '<p class="loading-message">Filhaal koi naukri mojood nahi hai.</p>';
        return;
    }

    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('job-card');
        card.innerHTML = `
            <div class="job-card-header"><h4>${item.title}</h4><span class="job-type">${item.type || ''}</span></div>
            <p class="company-name">${item.company}</p>
            <p class="location">${item.location || 'N/A'}</p>
            <div class="job-card-footer"><a href="${item.apply_link || '#'}" class="btn btn-primary" target="_blank">Tafseel Dekhein</a></div>`;
        container.appendChild(card);
    });
}

// --- ADMISSIONS DATA NIKALNE KA FUNCTION ---
async function fetchAdmissions() {
    const container = document.querySelector('#admissions-container');
    if (!container) return;
    container.innerHTML = '<p class="loading-message">Dakhlay load ho rahe hain...</p>';

    const { data, error } = await supabaseClient.from('admissions').select('*').order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = '<p class="error-message">Data load karne mein masla hua.</p>';
        return;
    }
    if (data.length === 0) {
        container.innerHTML = '<p class="loading-message">Filhaal koi dakhla mojood nahi hai.</p>';
        return;
    }

    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('job-card');
        card.innerHTML = `
            <div class="job-card-header"><h4>${item.program_name}</h4><span class="deadline">${item.deadline ? new Date(item.deadline).toLocaleDateString() : ''}</span></div>
            <p class="company-name">${item.university_name}</p>
            <p class="location">${item.city || 'N/A'}</p>
            <div class="job-card-footer"><a href="${item.details_link || '#'}" class="btn btn-primary" target="_blank">Tafseel Dekhein</a></div>`;
        container.appendChild(card);
    });
}

// ... (Baaqi functions for scholarships and reviews will be added later)

// --- PAGE LOAD HONE PAR KYA KARNA HAI ---
// Yeh "Main Controller" hai. Yeh check karta hai ke user konsay page par hai.
document.addEventListener('DOMContentLoaded', () => {
    const pageId = document.body.id;

    if (pageId === 'jobs-page') {
        fetchJobs();
    } else if (pageId === 'admissions-page') {
        fetchAdmissions();
    } 
    // Hum baaqi pages ke liye bhi yahan conditions add karenge
});


