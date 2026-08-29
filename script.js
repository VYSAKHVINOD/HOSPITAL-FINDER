// Initialize function that can be called multiple times
function initializeApp() {
    console.log('Initializing JavaScript...');
    
    // Image slider functionality
    const images = document.querySelectorAll('.image-slider img');
    let currentImage = 0;

    function changeImage() {
        if (images.length > 0) {
            images[currentImage].classList.remove('active');
            currentImage = (currentImage + 1) % images.length;
            images[currentImage].classList.add('active');
        }
    }

    // Clear any existing interval and set new one
    if (window.imageSliderInterval) {
        clearInterval(window.imageSliderInterval);
    }
    window.imageSliderInterval = setInterval(changeImage, 5000); // Change image every 5 seconds

    // Navigation and page switching
    const homeLink = document.getElementById('home-link');
    const aboutLink = document.getElementById('about-link');
    const contactLink = document.getElementById('contact-link');
    const helplineLink = document.getElementById('helpline-link');
    const factsLink = document.getElementById('facts-link');
    const loginLink = document.getElementById('login-link');
    const settingsLink = document.getElementById('settings-link');
    
    console.log('Elements found:', {
        homeLink: !!homeLink,
        aboutLink: !!aboutLink,
        contactLink: !!contactLink,
        helplineLink: !!helplineLink,
        loginLink: !!loginLink
    });
    const backToHomeResults = document.getElementById('back-to-home-results');
    const backToDetails = document.getElementById('back-to-details');

    const mainContent = document.getElementById('main-content');
    const resultsPage = document.getElementById('results-page');
    const detailsPage = document.getElementById('details-page');
    const aboutModal = document.getElementById('about-modal');
    const contactModal = document.getElementById('contact-modal');
    const helplineModal = document.getElementById('helpline-modal');
    const factsModal = document.getElementById('facts-modal');
    const settingsModal = document.getElementById('settings-modal');
    
    console.log('Modals found:', {
        aboutModal: !!aboutModal,
        contactModal: !!contactModal,
        helplineModal: !!helplineModal,
        factsModal: !!factsModal,
        settingsModal: !!settingsModal
    });

    const closeButtons = document.querySelectorAll('.close-modal');
    const toggleDark = document.getElementById('toggle-dark');
    const toggleEye = document.getElementById('toggle-eye');
    const toggleSound = document.getElementById('toggle-sound');
    const resetBtn = document.getElementById('reset-settings');
    const searchButton = document.getElementById('search-button');
    const districtSelect = document.getElementById('district-select');
    const resultsContainer = document.getElementById('results-container');
    const specializedSelect = document.getElementById('specialized-select');
    const detailsTitle = document.getElementById('details-title');
    const detailsContent = document.getElementById('details-content');

    // Show modal function with auto-close
    function showModal(modal) {
        console.log('showModal called with:', modal);
        if (modal) {
            modal.style.display = 'flex';
            console.log('Modal display set to flex');
            setTimeout(() => {
                modal.style.display = 'none';
                console.log('Modal auto-closed');
            }, 10000); // Auto-close after 10 seconds
        } else {
            console.error('Modal is null or undefined');
        }
    }

    // About link click handler
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(aboutModal);
    });

    // Contact link click handler
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(contactModal);
    });
    // Settings link click handler (NO auto-close)
    if (settingsLink && settingsModal) {
        settingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            settingsModal.style.display = 'flex';
        });
    }

    // Restore preferences
    const savedDark = localStorage.getItem('pref_dark_mode');
    const savedEye = localStorage.getItem('pref_eye_protect');
    const savedSound = localStorage.getItem('pref_sound_effects');
    const darkEnabled = savedDark === 'true';
    const eyeEnabled = savedEye === 'true';
    const soundEnabled = savedSound === 'true';
    if (toggleDark) {
        toggleDark.setAttribute('aria-checked', darkEnabled ? 'true' : 'false');
    }
    if (toggleEye) {
        toggleEye.setAttribute('aria-checked', eyeEnabled ? 'true' : 'false');
    }
    if (toggleSound) {
        toggleSound.setAttribute('aria-checked', soundEnabled ? 'true' : 'false');
    }
    // Apply effects
    applyDarkMode(darkEnabled);
    applyEyeProtection(eyeEnabled);

    // Toggle handlers
    if (toggleDark) {
        toggleDark.addEventListener('click', () => {
            const next = toggleDark.getAttribute('aria-checked') !== 'true';
            toggleDark.setAttribute('aria-checked', next ? 'true' : 'false');
            localStorage.setItem('pref_dark_mode', String(next));
            applyDarkMode(next);
        });
    }
    if (toggleEye) {
        toggleEye.addEventListener('click', () => {
            const next = toggleEye.getAttribute('aria-checked') !== 'true';
            toggleEye.setAttribute('aria-checked', next ? 'true' : 'false');
            localStorage.setItem('pref_eye_protect', String(next));
            applyEyeProtection(next);
        });
    }
    if (toggleSound) {
        toggleSound.addEventListener('click', () => {
            const next = toggleSound.getAttribute('aria-checked') !== 'true';
            toggleSound.setAttribute('aria-checked', next ? 'true' : 'false');
            localStorage.setItem('pref_sound_effects', String(next));
            enableSoundEffects(next);
        });
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetAllSettings();
        });
    }

    function applyDarkMode(enabled) {
        const b = document.body;
        if (enabled) {
            b.classList.add('dark-mode');
        } else {
            b.classList.remove('dark-mode');
        }
    }

    function applyEyeProtection(enabled) {
        let overlay = document.getElementById('eye-protect-overlay');
        if (enabled) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'eye-protect-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.right = '0';
                overlay.style.bottom = '0';
                overlay.style.pointerEvents = 'none';
                overlay.style.background = 'rgba(255, 255, 200, 0.2)';
                overlay.style.zIndex = '2147483646';
                document.body.appendChild(overlay);
            }
        } else if (overlay) {
            overlay.remove();
        }
    }

    // Sound effect setup
    function enableSoundEffects(enabled) {
        if (enabled) {
            // Attach global click handler once
            if (!window.__softClickHandler) {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                window.__softClickHandler = function(e) {
                    const t = e.target;
                    if (!t) return;
                    // Only play on interactive elements
                    const isInteractive = ['A','BUTTON','INPUT','SELECT','TEXTAREA'].includes(t.tagName) || t.getAttribute('role') === 'button';
                    if (!isInteractive) return;

                    try {
                        const o = audioCtx.createOscillator();
                        const g = audioCtx.createGain();
                        o.type = 'sine';
                        o.frequency.value = 440; // soft click tone
                        g.gain.value = 0.03; // very soft
                        o.connect(g);
                        g.connect(audioCtx.destination);
                        const now = audioCtx.currentTime;
                        o.start(now);
                        o.stop(now + 0.06); // very short
                    } catch(err) {
                        console.warn('Sound playback failed', err);
                    }
                };
                document.addEventListener('click', window.__softClickHandler, true);
            }
        } else {
            if (window.__softClickHandler) {
                document.removeEventListener('click', window.__softClickHandler, true);
                window.__softClickHandler = null;
            }
        }
    }

    // Initialize sound state on load
    enableSoundEffects(soundEnabled);

    

    // Healthcase facts cycling
    const healthcareFacts = [
        '🏃‍♂️ Regular exercise lowers risk of heart disease and diabetes.',
        '💉 Vaccines save millions of lives every year.',
        '🧼 Handwashing cuts infection spread by up to 40%.',
        '💊 Antibiotic misuse causes drug resistance.',
        '💤 Good sleep strengthens immunity and heart health.',
        '🥦 Fruits and veggies reduce cancer and heart disease risk.',
        '🍭 Too much sugar increases diabetes and obesity risk.',
        '🚫 Trans fats raise bad cholesterol and heart risk.',
        '🐟 Omega-3s boost brain and heart health.',
        '💧 Staying hydrated improves focus and memory.',
        '😫 Chronic stress weakens your immune system.',
        '🧘‍♀️ Meditation reduces stress, anxiety, and depression.',
        '🤝 Strong social ties increase lifespan and happiness.',
        '🚭 Smoking is the top preventable cause of death.',
        '🍷 No alcohol level is completely safe for health.',
        '🌞 Sunscreen prevents most skin cancers.',
        '🩺 Regular health checkups catch diseases early.',
        '📚 Lifelong learning protects brain health.',
        '👂 Treating hearing loss lowers dementia risk.',
        '⏳ Exercise slows aging at the cellular level.'
    ];
    let currentFactIndex = 0;

    function showNextHealthFact() {
        if (!factsModal) {
            console.error('Facts modal not found');
            return;
        }
        const factsText = document.getElementById('facts-text');
        if (factsText && healthcareFacts.length > 0) {
            factsText.textContent = healthcareFacts[currentFactIndex];
            currentFactIndex = (currentFactIndex + 1) % healthcareFacts.length;
        }
        showModal(factsModal);
    }

    if (factsLink) {
        factsLink.addEventListener('click', (e) => {
            e.preventDefault();
            showNextHealthFact();
        });
    }

    // Define the click handler function first
    function handleHelplineClick(e) {
        e.preventDefault();
        console.log('Helpline clicked!');
        if (helplineModal) {
            console.log('Showing helpline modal...');
            showModal(helplineModal);
        } else {
            console.error('Helpline modal not found');
        }
    }
    
    // Helpline link click handler - using event delegation for better reliability
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'helpline-link') {
            e.preventDefault();
            console.log('Helpline clicked via event delegation!');
            if (helplineModal) {
                console.log('Showing helpline modal...');
                showModal(helplineModal);
            } else {
                console.error('Helpline modal not found');
            }
        }
    });
    
    // Also try direct event listener as backup
    if (helplineLink) {
        console.log('Adding helpline click listener...');
        helplineLink.addEventListener('click', handleHelplineClick);
        console.log('Helpline listener added successfully');
    } else {
        console.error('Helpline link not found');
    }

    // Home link click handler
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        mainContent.style.display = 'flex';
        resultsPage.style.display = 'none';
        detailsPage.style.display = 'none';
    });

    // Back to home from results
    backToHomeResults.addEventListener('click', (e) => {
        e.preventDefault();
        mainContent.style.display = 'flex';
        resultsPage.style.display = 'none';
        detailsPage.style.display = 'none';
    });

    // Back to results from details
    backToDetails.addEventListener('click', (e) => {
        e.preventDefault();
        resultsPage.style.display = 'block';
        detailsPage.style.display = 'none';
    });

    // Close modal buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            aboutModal.style.display = 'none';
            contactModal.style.display = 'none';
            helplineModal.style.display = 'none';
            if (factsModal) factsModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
        }
        if (e.target === helplineModal) {
            helplineModal.style.display = 'none';
        }
        if (e.target === factsModal) {
            factsModal.style.display = 'none';
        }
        if (e.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
    

    // Function to fetch hospitals by district
    async function fetchHospitalsByDistrict(district, specialized) {
        try {
            const trimmedSpecialized = (specialized || '').trim() || 'ALL';
            const params = new URLSearchParams({ district, specialized: trimmedSpecialized });
            const url = `api/get_hospitals.php?${params.toString()}`;
            console.log('Fetching hospitals:', { url, district, specialized: trimmedSpecialized });
            const response = await fetch(url);
            const data = await response.json();
            console.log('Hospitals response count:', Array.isArray(data) ? data.length : 'n/a');
            return data;
        } catch (error) {
            console.error('Error fetching hospitals:', error);
            return [];
        }
    }

    // Function to fetch hospital details by ID
    async function fetchHospitalDetails(id) {
        try {
            const response = await fetch(`api/get_hospital_details.php?id=${encodeURIComponent(id)}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching hospital details:', error);
            return null;
        }
    }

    // Search functionality (bind only once)
    if (!searchButton.dataset.bound) {
    searchButton.dataset.bound = 'true';
    searchButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const district = districtSelect.value;
        const specialized = specializedSelect ? (specializedSelect.value || '').trim() : 'ALL';
        
        if (district) {
            // Show loading state
            searchButton.textContent = 'Searching...';
            
            try {
                // Fetch hospitals from server
                const hospitals = await fetchHospitalsByDistrict(district, specialized);
                
                // Hide main content and show results page
                mainContent.style.display = 'none';
                resultsPage.style.display = 'block';
                detailsPage.style.display = 'none';
                
                // Clear previous results
                resultsContainer.innerHTML = '';
                
                if (!Array.isArray(hospitals) || hospitals.length === 0) {
                    resultsContainer.innerHTML = '<p>Not found.</p>';
                } else {
                    // Add results to page
                    hospitals.forEach(hospital => {
                        // Calculate distance (random for demo purposes)
                        const distance = (Math.random() * 10 + 1).toFixed(1) + ' km';
                        
                        const card = document.createElement('div');
                        card.className = 'hospital-card';
                        card.innerHTML = `
                            <h2>${hospital.name}</h2>
                            <p><strong>District:</strong> ${district}</p>
                            <p><strong>Distance:</strong> ${distance}</p>
                            <p><strong>Services:</strong> ${hospital.services}</p>
                            <p><strong>Rating:</strong> ${hospital.rating}</p>
                            <a href="#" class="details-link" data-id="${hospital.id}">View Details</a>
                        `;
                        resultsContainer.appendChild(card);
                    });
                    
                    // Add event listeners to details links
                    document.querySelectorAll('.details-link').forEach(link => {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            const hospitalId = e.target.getAttribute('data-id');
                            showHospitalDetails(hospitalId, district);
                        });
                    });
                }
            } catch (error) {
                alert('Error fetching hospitals. Please try again.');
                console.error(error);
            }
            
            // Reset search button
            searchButton.textContent = 'Search Hospitals';
        } else {
            alert('Please select a district');
        }
    });
    }

    // Function to show hospital details
    async function showHospitalDetails(hospitalId, district) {
        try {
            const hospital = await fetchHospitalDetails(hospitalId);
            
            if (hospital) {
                // Hide other pages and show details page
                mainContent.style.display = 'none';
                resultsPage.style.display = 'none';
                detailsPage.style.display = 'block';
                
                // Calculate distance (random for demo purposes)
                const distance = (Math.random() * 10 + 1).toFixed(1) + ' km';
                
                // Set details content
                detailsTitle.textContent = hospital.name;
                detailsContent.innerHTML = `
                    <div class="hospital-details">
                        <h2>${hospital.name}</h2>
                        <p><strong>Address:</strong> ${hospital.address}</p>
                        <p><strong>Phone:</strong> ${hospital.phone}</p>
                        <p><strong>Distance:</strong> ${distance}</p>
                        <p><strong>Rating:</strong> ${hospital.rating}</p>
                        <p><strong>Specialties:</strong> ${hospital.services}</p>
                        <p><strong>Opening Hours:</strong> ${hospital.opening_time} - ${hospital.closing_time}</p>
                        <p><strong>Website:</strong> <a href="${hospital.links}" target="_blank">${hospital.links}</a></p>
                        <p><strong>District:</strong> ${district}</p>
                    </div>
                `;
            } else {
                alert('Hospital details not found');
            }
        } catch (error) {
            alert('Error fetching hospital details. Please try again.');
            console.error(error);
        }
    }

} // End of initializeApp function

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// Also initialize when the page becomes visible (for when returning from admin page)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        initializeApp();
    }
});

// Initialize on page load (for when navigating back from admin)
window.addEventListener('load', initializeApp);

// Global function for helpline modal - works regardless of initialization
function showHelplineModal() {
    console.log('showHelplineModal called');
    const helplineModal = document.getElementById('helpline-modal');
    if (helplineModal) {
        console.log('Modal found, showing...');
        helplineModal.style.display = 'flex';
        setTimeout(() => {
            helplineModal.style.display = 'none';
        }, 10000);
    } else {
        console.error('Helpline modal not found');
    }
}

// Global function to open settings modal (fallback)
function showSettingsModal() {
    try {
        const modal = document.getElementById('settings-modal');
        if (modal) modal.style.display = 'flex';
    } catch (e) { console.error(e); }
}

// Apply helpers accessible globally
function applyDarkMode(enabled) {
    const b = document.body;
    if (enabled) {
        b.classList.add('dark-mode');
    } else {
        b.classList.remove('dark-mode');
    }
}

function applyEyeProtection(enabled) {
    let overlay = document.getElementById('eye-protect-overlay');
    if (enabled) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'eye-protect-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.bottom = '0';
            overlay.style.pointerEvents = 'none';
            overlay.style.background = 'rgba(255, 255, 200, 0.2)';
            overlay.style.zIndex = '2147483646';
            document.body.appendChild(overlay);
        }
    } else if (overlay) {
        overlay.remove();
    }
}

// Fallback toggle handlers used by inline onclick
function toggleDarkModeSwitch() {
    try {
        const btn = document.getElementById('toggle-dark');
        const next = btn.getAttribute('aria-checked') !== 'true';
        btn.setAttribute('aria-checked', next ? 'true' : 'false');
        localStorage.setItem('pref_dark_mode', String(next));
        applyDarkMode(next);
    } catch (e) { console.error(e); }
}

function toggleEyeProtectionSwitch() {
    try {
        const btn = document.getElementById('toggle-eye');
        const next = btn.getAttribute('aria-checked') !== 'true';
        btn.setAttribute('aria-checked', next ? 'true' : 'false');
        localStorage.setItem('pref_eye_protect', String(next));
        applyEyeProtection(next);
    } catch (e) { console.error(e); }
}

function toggleSoundEffectsSwitch() {
    try {
        const btn = document.getElementById('toggle-sound');
        const next = btn.getAttribute('aria-checked') !== 'true';
        btn.setAttribute('aria-checked', next ? 'true' : 'false');
        localStorage.setItem('pref_sound_effects', String(next));
        // ensure handler reflects updated state
        if (typeof enableSoundEffects === 'function') {
            enableSoundEffects(next);
        }
    } catch (e) { console.error(e); }
}

function resetAllSettings() {
    try {
        // clear storage
        localStorage.removeItem('pref_dark_mode');
        localStorage.removeItem('pref_eye_protect');
        localStorage.removeItem('pref_sound_effects');
        localStorage.setItem('selectedLanguage', 'en');

        // update toggles
        const d = document.getElementById('toggle-dark');
        const e = document.getElementById('toggle-eye');
        const s = document.getElementById('toggle-sound');
        if (d) d.setAttribute('aria-checked', 'false');
        if (e) e.setAttribute('aria-checked', 'false');
        if (s) s.setAttribute('aria-checked', 'false');

        // remove effects
        applyDarkMode(false);
        applyEyeProtection(false);
        enableSoundEffects(false);

        // reset language to English immediately
        if (typeof changeLanguage === 'function') {
            changeLanguage('en');
        } else {
            // fallback: update visible text of nav if exists
            const languageLink = document.getElementById('language-link');
            if (languageLink) languageLink.textContent = 'Language';
        }
    } catch (err) {
        console.error('Failed to reset settings', err);
    }
}

// Global function for facts modal - ensures it works regardless of initialization timing
function showFactsModal() {
    try {
        // If initializeApp hasn't run yet, safely locate modal elements
        const factsModalLocal = document.getElementById('facts-modal');
        const factsText = document.getElementById('facts-text');
        if (!factsModalLocal || !factsText) {
            console.error('Facts modal elements not found');
            return;
        }

        // Keep a singleton facts array and index on window to persist across re-initializations
        if (!window.healthcareFacts) {
            window.healthcareFacts = [
                '🏃‍♂️ Regular exercise lowers risk of heart disease and diabetes.',
                '💉 Vaccines save millions of lives every year.',
                '🧼 Handwashing cuts infection spread by up to 40%.',
                '💊 Antibiotic misuse causes drug resistance.',
                '💤 Good sleep strengthens immunity and heart health.',
                '🥦 Fruits and veggies reduce cancer and heart disease risk.',
                '🍭 Too much sugar increases diabetes and obesity risk.',
                '🚫 Trans fats raise bad cholesterol and heart risk.',
                '🐟 Omega-3s boost brain and heart health.',
                '💧 Staying hydrated improves focus and memory.',
                '😫 Chronic stress weakens your immune system.',
                '🧘‍♀️ Meditation reduces stress, anxiety, and depression.',
                '🤝 Strong social ties increase lifespan and happiness.',
                '🚭 Smoking is the top preventable cause of death.',
                '🍷 No alcohol level is completely safe for health.',
                '🌞 Sunscreen prevents most skin cancers.',
                '🩺 Regular health checkups catch diseases early.',
                '📚 Lifelong learning protects brain health.',
                '👂 Treating hearing loss lowers dementia risk.',
                '⏳ Exercise slows aging at the cellular level.'
            ];
        }
        if (typeof window.currentFactIndex !== 'number') {
            window.currentFactIndex = 0;
        }

        factsText.textContent = window.healthcareFacts[window.currentFactIndex];
        window.currentFactIndex = (window.currentFactIndex + 1) % window.healthcareFacts.length;

        factsModalLocal.style.display = 'flex';
        setTimeout(() => {
            factsModalLocal.style.display = 'none';
        }, 10000);
    } catch (err) {
        console.error('Error showing facts modal', err);
    }
}

// Custom cursor behavior
(function setupCustomCursor(){
    const cursorEl = document.getElementById('custom-cursor');
    if (!cursorEl) { console.warn('Custom cursor element not found'); return; }
    console.log('Custom cursor initialized');

    let mouseX = 0, mouseY = 0;
    let renderX = 0, renderY = 0;
    const lerpFactor = 0.25; // smooth follow

    function onMouseMove(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Immediate positioning for responsiveness/fallback
        cursorEl.style.left = mouseX + 'px';
        cursorEl.style.top = mouseY + 'px';
        if (cursorEl.style.opacity !== '1') cursorEl.style.opacity = '1';
    }

    function onClick(){
        cursorEl.classList.remove('cursor-click');
        // force reflow to restart animation
        void cursorEl.offsetWidth;
        cursorEl.classList.add('cursor-click');
    }

    function loop(){
        renderX += (mouseX - renderX) * lerpFactor;
        renderY += (mouseY - renderY) * lerpFactor;
        // position via left/top (transform already accounts for centering)
        cursorEl.style.left = renderX + 'px';
        cursorEl.style.top = renderY + 'px';
        requestAnimationFrame(loop);
    }

    // Hide cursor when leaving window
    function onMouseLeave(){ cursorEl.style.opacity = '0'; }
    function onMouseEnter(){ cursorEl.style.opacity = '1'; }

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('click', onClick, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);

    // Toggle hover class when over interactive elements
    document.addEventListener('mouseover', (e) => {
        const t = e.target;
        if (t && (t.tagName === 'A' || t.tagName === 'BUTTON' || t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.getAttribute('role') === 'button')) {
            cursorEl.classList.add('cursor-hover');
        }
    }, { passive: true });
    document.addEventListener('mouseout', (e) => {
        const t = e.target;
        if (t && (t.tagName === 'A' || t.tagName === 'BUTTON' || t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.getAttribute('role') === 'button')) {
            cursorEl.classList.remove('cursor-hover');
        }
    }, { passive: true });

    requestAnimationFrame(loop);
})();