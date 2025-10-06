// Control Room se supabase client ko import karein
import { supabaseClient } from './config.js';

// --- JOBS FETCH KARNE KA FUNCTION ---
async function fetchJobs() {
    const container = document.querySelector('#jobs-container');
    if (!container) return; // Sirf jobs page par chalega

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
            <div class="job-card-header">
                <h3 class="job-title">${item.title}</h3>
                <span class="job-type">${item.type || ''}</span>
            </div>
            <p>${item.company} • ${item.location || 'N/A'}</p>
        `;
        container.appendChild(card);
    });
}

// --- ADMISSIONS FETCH KARNE KA FUNCTION ---
async function fetchAdmissions() {
    const container = document.querySelector('#admissions-container');
    if (!container) return; // Sirf admissions page par chalega

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
        card.classList.add('job-card'); // Hum wahi design istemal kar rahe hain
        card.innerHTML = `
            <div class="job-card-header">
                <h3 class="job-title">${item.program_name}</h3>
            </div>
            <p>${item.university_name} • ${item.city || 'N/A'}</p>
        `;
        container.appendChild(card);
    });
}

// --- SCHOLARSHIPS FETCH KARNE KA FUNCTION ---
async function fetchScholarships() {
    const container = document.querySelector('#scholarships-container');
    if (!container) return; // Sirf scholarships page par chalega

    container.innerHTML = '<p class="loading-message">Scholarships load ho rahi hain...</p>';
    const { data, error } = await supabaseClient.from('scholarships').select('*').order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = '<p class="error-message">Data load karne mein masla hua.</p>';
        return;
    }
    if (data.length === 0) {
        container.innerHTML = '<p class="loading-message">Filhaal koi scholarship mojood nahi hai.</p>';
        return;
    }

    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('job-card');
        card.innerHTML = `
            <div class="job-card-header">
                <h3 class="job-title">${item.scholarship_name}</h3>
            </div>
            <p>${item.offered_by} • ${item.country || 'N/A'}</p>
        `;
        container.appendChild(card);
    });
}

// --- REVIEWS FETCH KARNE KA FUNCTION ---
async function fetchReviews() {
    const container = document.querySelector('#reviews-container');
    if (!container) return; // Sirf reviews page par chalega

    container.innerHTML = '<p class="loading-message">Reviews load ho rahe hain...</p>';
    const { data, error } = await supabaseClient.from('reviews').select('*').order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = '<p class="error-message">Data load karne mein masla hua.</p>';
        return;
    }
    if (data.length === 0) {
        container.innerHTML = '<p class="loading-message">Filhaal koi review mojood nahi hai.</p>';
        return;
    }

    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('job-card');
        card.innerHTML = `
            <div class="job-card-header">
                <h3 class="job-title">${item.company_name}</h3>
                <span class="job-type">${'⭐'.repeat(item.rating)}</span>
            </div>
            <p>"${item.review_title || ''}" - ${item.reviewer_position || 'Employee'}</p>
        `;
        container.appendChild(card);
    });
}

// Jab page load ho to tamam functions chalayein
// Har function khud check kar lega ke usay chalna hai ya nahi
document.addEventListener('DOMContentLoaded', () => {
    fetchJobs();
    fetchAdmissions();
    fetchScholarships();
    fetchReviews();
});

