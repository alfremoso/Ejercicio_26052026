/**
 * MyPet Landing Page Interactions
 * Handles Navbar scroll effects, portfolio filtering, smooth scrolling, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR SCROLL EFFECT
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Trigger once on load in case of refresh midway
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply for local anchors
            if(this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate offset for fixed header
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. CATALOG FILTER DYNAMICS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const petCards = document.querySelectorAll('.pet-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            petCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Add a small opacity transition trick
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'block';
                        // Re-trigger layout before fading in
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300); // Wait for fade out
            });
        });
    });

    // 4. FORM VALIDATION
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const errorMsg = document.getElementById('email-error');
    const successMsg = document.getElementById('email-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission

        // Reset messages
        errorMsg.style.display = 'none';
        successMsg.style.display = 'none';
        emailInput.style.border = 'none';

        const emailValue = emailInput.value.trim();
        
        // Simple regex for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValue || !emailPattern.test(emailValue)) {
            // Invalid email
            errorMsg.style.display = 'block';
            emailInput.style.border = '2px solid #e76f51';
            // Shake animation could go here
        } else {
            // Valid email
            successMsg.style.display = 'block';
            emailInput.value = ''; // Clear input
            
            // Hide success message after 4 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
        }
    });

});
