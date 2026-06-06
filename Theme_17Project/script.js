// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});



//načítání recenzí z api
const loadRandomReviews = async () => {
        const testimonialsGrid = document.querySelector('.testimonials-grid');

        try {
            const response = await fetch('https://6a211b64b1d0aaf32b4ec4f9.mockapi.io/api/v1/recenze');
            
            if (!response.ok) {
                throw new Error('Chyba při načítání recenzí ze serveru.');
            }
            
            const reviews = await response.json();
            
            // Pokud v API nic není, necháme na webu statické recenze z HTML
            if (!Array.isArray(reviews) || reviews.length === 0) return;

            // Náhodné zamíchání pole recenzí a výběr prvních 3
            const shuffledReviews = reviews.sort(() => 0.5 - Math.random());
            const selectedReviews = shuffledReviews.slice(0, 3);
            
            // Vyčištění existujících (statických) recenzí v HTML
            testimonialsGrid.innerHTML = '';
            
            // Vypsání nových recenzí
            selectedReviews.forEach(review => {
                const ratingCount = parseInt(review.Hvezdy) || 5; 
                const starsHtml = '★'.repeat(ratingCount);
                
                // Připojí jméno z API (Jmeno nebo jmeno), případně defaultní text
                const authorName = review.Name || review.jmeno || 'Ověřený zákazník';
                const serviceName = review.Sluzba || 'Úklidové služby';
                const feedbackText = review.Poznamka || 'Zákazník nezanechal slovní hodnocení.';
                
                const card = document.createElement('div');
                card.className = 'testimonial-card';
                card.innerHTML = `
                    <div class="testimonial-stars">${starsHtml}</div>
                    <p class="testimonial-text">"${feedbackText}"</p>
                    <div class="testimonial-author">
                        <strong>${authorName}</strong>
                        <span>${serviceName}</span>
                    </div>
                `;
                
                testimonialsGrid.appendChild(card);
            });
            
        } catch (error) {
            console.error('Nepodařilo se načíst recenze z API:', error);
        }
    };

    // Okamžité spuštění funkce po načtení stránky
    loadRandomReviews();
;


// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Retrieve form data
        const formData = new FormData(contactForm);
        
        // Build the data object using the exact "name" attributes from your HTML
        const data = {
            Jmeno: formData.get('name'),
            Telefon: formData.get('phone'),
            Email: formData.get('email'),
            Sluzba: formData.get('service-type'),
            Zprava: formData.get('message')
        };
        
        // Update the submit button UI while processing
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Odesílám...';
        submitBtn.disabled = true;

        try {
            // Push the contact data to your MockAPI endpoint
            const response = await fetch('https://6a211b64b1d0aaf32b4ec4f9.mockapi.io/api/v1/Contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success message
                alert('Děkujeme! Vaše poptávka byla úspěšně odeslána.');
                
                // Clear the form fields
                contactForm.reset();
            } else {
                alert('Jejda, něco se pokazilo. Zkuste to prosím znovu.');
            }
        } catch (error) {
            console.error('Chyba při odesílání poptávky:', error);
            alert('Došlo k chybě připojení. Zkontrolujte prosím své internetové připojení.');
        } finally {
            // Restore button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
        
// 3. Smazání uloženého draftu z localStorage po úspěšném odeslání
        localStorage.removeItem('contactFormDraft');

    });
}



// 1. Obnova rozepsaných dat z localStorage
        const savedDraft = localStorage.getItem('contactFormDraft');
        if (savedDraft) {
            try {
                const draftData = JSON.parse(savedDraft);
                Object.keys(draftData).forEach(key => {
                    const inputField = contactForm.elements[key];
                    if (inputField) {
                        inputField.value = draftData[key];
                    }
                });
            } catch (error) {
                console.error('Chyba při načítání formuláře:', error);
            }
        }
// 2. Průběžné ukládání do localStorage při psaní
        contactForm.addEventListener('input', () => {
            const formData = new FormData(contactForm);
            const draftData = Object.fromEntries(formData.entries());
            localStorage.setItem('contactFormDraft', JSON.stringify(draftData));
        });



//REGISTRACE SERVIS WORKRU

if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
    .then(registration => {
        console.log('ServiceWorker úspěšně zaregistrován s rozsahem:', registration.scope);
    })
    .catch(err => {
        console.log('Registrace ServiceWorkeru selhala:', err);
    });
});
}

