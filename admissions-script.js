// Control Room se supabase client ko import karein
import { supabaseClient } from './config.js';

// Yeh function Dakhlay (Admissions) ka data Supabase se layega
async function fetchAdmissions() {
    const container = document.querySelector('#admissions-container');
    if (!container) {
        console.error('Admissions container nahi mila!');
        return;
    }

    container.innerHTML = '<p class="loading-message">Dakhlay load ho rahe hain...</p>';

    const { data, error } = await supabaseClient
        .from('admissions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        container.innerHTML = '<p class="error-message">Data load karne mein masla hua.</p>';
        console.error('Error fetching admissions:', error);
        return;
    }

    if (!data || data.length === 0) {
        container.innerHTML = '<p class="loading-message">Filhaal koi dakhla mojood nahi hai.</p>';
        return;
    }

    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('job-card'); // Hum wahi purana style istemal kar rahe hain
        
        // Deadline ko ahtiyat se format karein
        let deadlineText = 'N/A';
        if (item.deadline) {
            try {
                deadlineText = new Date(item.deadline).toLocaleDateString('en-GB'); // Use a specific format
            } catch (e) {
                console.warn('Invalid date format for deadline:', item.deadline);
            }
        }

        card.innerHTML = `
            <div class="job-card-header">
                <h4>${item.program_name}</h4>
                <span class="deadline">${deadlineText}</span>
            </div>
            <p class="company-name">${item.university_name}</p>
            <p class="location">${item.city || 'N/A'}</p>
            <div class="job-card-footer">
                <a href="${item.details_link || '#'}" class="btn btn-primary" target="_blank">Tafseel Dekhein</a>
            </div>`;
        container.appendChild(card);
    });
}

// Jab page load ho to yeh function chalayein
document.addEventListener('DOMContentLoaded', fetchAdmissions);

