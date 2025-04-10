// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Portfolio filtering functionality (if on portfolio page)
    const portfolioFilters = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                portfolioFilters.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show or hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Form validation for contact form
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const message = contactForm.querySelector('#message').value;
            
            // Simple validation
            if (name.trim() === '') {
                isValid = false;
                showError(contactForm.querySelector('#name'), 'Name is required');
            } else {
                removeError(contactForm.querySelector('#name'));
            }
            
            if (email.trim() === '') {
                isValid = false;
                showError(contactForm.querySelector('#email'), 'Email is required');
            } else if (!isValidEmail(email)) {
                isValid = false;
                showError(contactForm.querySelector('#email'), 'Please enter a valid email');
            } else {
                removeError(contactForm.querySelector('#email'));
            }
            
            if (message.trim() === '') {
                isValid = false;
                showError(contactForm.querySelector('#message'), 'Message is required');
            } else {
                removeError(contactForm.querySelector('#message'));
            }
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                // For this demo, we'll just show a success message
                contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Thank you for your message!</h3><p>I\'ll get back to you as soon as possible.</p></div>';
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        formGroup.classList.add('error');
        input.classList.add('error-input');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        formGroup.classList.remove('error');
        input.classList.remove('error-input');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }