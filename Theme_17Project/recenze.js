// recenze.js

const reviewForm = document.getElementById('reviewForm');

if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Retrieve form data
        const formData = new FormData(reviewForm);
        
        // Build the data object using the exact "name" attributes from your HTML
        const data = {
            Name: formData.get('name'),
            Email: formData.get('mail'),
            Sluzba: formData.get('sluzba'),
            Spokojenost: formData.get('satisfaction'),
            Hvezdy: formData.get('rating'), // This will automatically grab the value of the checked star
            Poznamka: formData.get('feedback')
        };
        
        // Update the submit button UI while processing
        const submitBtn = reviewForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Odesílám...';
        submitBtn.disabled = true;

        try {
            // Push the review data to your MockAPI endpoint
            const response = await fetch('https://6a211b64b1d0aaf32b4ec4f9.mockapi.io/api/v1/recenze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success message
                alert('Děkujeme za vaše hodnocení! Odesláno úspěšně.');
                
                // Clear the form fields
                reviewForm.reset();
            } else {
                alert('Jejda, něco se pokazilo. Zkuste to prosím znovu.');
            }
        } catch (error) {
            console.error('Chyba při odesílání hodnocení:', error);
            alert('Došlo k chybě připojení. Zkontrolujte prosím své internetové připojení.');
        } finally {
            // Restore button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}