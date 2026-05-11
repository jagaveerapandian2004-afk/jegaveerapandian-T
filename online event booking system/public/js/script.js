console.log('Event Booking System Loaded');

// Form Validation

const forms = document.querySelectorAll('form');

forms.forEach(form => {

    form.addEventListener('submit', (e) => {

        const inputs = form.querySelectorAll('input[required]');

        let valid = true;

        inputs.forEach(input => {
            if(input.value.trim() === '') {
                valid = false;
            }
        });

        if(!valid) {
            e.preventDefault();
            alert('Please fill all required fields');
        }
    });
});

// Booking Confirmation

const bookingButton = document.querySelector('.booking-btn');

if(bookingButton) {
    bookingButton.addEventListener('click', () => {
        alert('Processing your booking...');
    });
}

// Simple Search Filter

const searchInput = document.querySelector('#searchEvent');

if(searchInput) {

    searchInput.addEventListener('keyup', () => {

        const value = searchInput.value.toLowerCase();

        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('h2').innerText.toLowerCase();

            if(title.includes(value)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}