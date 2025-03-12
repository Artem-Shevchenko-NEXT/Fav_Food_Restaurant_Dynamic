document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu tabs on the menu page
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and content
                document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabContent = document.getElementById(button.dataset.tab);
                if (tabContent) tabContent.classList.add('active');
            });
        });
    }

    // Menu item highlighting with animation
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.add('highlight-animation');
                setTimeout(() => {
                    item.classList.remove('highlight-animation');
                }, 1000);
            });
        });
    }

    // Today's special dish randomizer for homepage
    const dishHighlight = document.getElementById('dish-highlight');
    if (dishHighlight) {
        const dishes = [
            {
                name: "Carbonara",
                description: "Our signature pasta with pancetta and a creamy egg sauce."
            },
            {
                name: "Lu Rou Fan",
                description: "Taiwanese comfort food with melt-in-your-mouth braised pork."
            },
            {
                name: "Tonkotsu Ramen",
                description: "Rich, creamy pork broth with tender chashu and perfect noodles."
            },
            {
                name: "Flæskesteg Sandwich",
                description: "Traditional Danish pork with crispy crackling in a soft bun."
            },
            {
                name: "Gourmet Chicken Nuggets",
                description: "Premium breaded chicken with our special dipping sauces."
            }
        ];

        // Randomly select a dish and update the highlight section
        const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
        const dishCard = dishHighlight.querySelector('.dish-card .dish-info');
        if (dishCard) {
            dishCard.innerHTML = `
                <h3>${randomDish.name}</h3>
                <p>${randomDish.description}</p>
                <p class="price">Special Price: $14.99</p>
            `;
        }
    }

    // Form validation for the reservation form
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value;
            const formMessage = document.getElementById('form-message');
            
            // Simple validation
            if (name === '' || email === '' || date === '') {
                formMessage.textContent = 'Please fill out all required fields.';
                formMessage.className = 'error';
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'error';
                return;
            }
            
            // Check if date is in the future
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                formMessage.textContent = 'Please select a future date for your reservation.';
                formMessage.className = 'error';
                return;
            }
            
            // Form submission success (in a real app, this would send data to a server)
            formMessage.textContent = 'Reservation submitted successfully! We will contact you shortly to confirm.';
            formMessage.className = 'success';
            reservationForm.reset();
            
            // After 5 seconds, clear the success message
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        });
    }

    // Add a CSS class for menu item selection animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { transform: scale(1); box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); }
            50% { transform: scale(1.05); box-shadow: 0 10px 20px rgba(214, 69, 69, 0.3); }
            100% { transform: scale(1); box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); }
        }
        .highlight-animation {
            animation: highlight 1s ease;
        }
    `;
    document.head.appendChild(style);
});
