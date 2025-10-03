// Language selection functionality
let currentLanguage = 'en';

function selectLanguage(lang) {
    currentLanguage = lang;
    const modal = document.getElementById('languageModal');
    const mainContent = document.getElementById('mainContent');
    
    // Hide modal and show main content
    modal.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Update all text content
    updateLanguage(lang);
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-es]');
    
    elements.forEach(element => {
        if (lang === 'es') {
            element.textContent = element.getAttribute('data-es');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update placeholders
    const inputs = document.querySelectorAll('input[data-placeholder-en], textarea[data-placeholder-en]');
    inputs.forEach(input => {
        if (lang === 'es') {
            input.placeholder = input.getAttribute('data-placeholder-es');
        } else {
            input.placeholder = input.getAttribute('data-placeholder-en');
        }
    });
    
    // Update select options
    const options = document.querySelectorAll('option[data-en][data-es]');
    options.forEach(option => {
        if (lang === 'es') {
            option.textContent = option.getAttribute('data-es');
        } else {
            option.textContent = option.getAttribute('data-en');
        }
    });
}

// Check for saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        selectLanguage(savedLanguage);
    }
});

// Form handling and validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (validateForm(data)) {
            // Show success message
            showSuccessMessage();
            
            // Here you would typically send the data to your server
            console.log('Form data:', data);
            
            // Reset form
            form.reset();
        }
    });
    
    // Form validation
    function validateForm(data) {
        const requiredFields = ['parentName', 'email', 'phone', 'childAge', 'adhdDiagnosis'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('Please enter a valid email address.');
            return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            showError('Please enter a valid phone number.');
            return false;
        }
        
        return true;
    }
    
    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        const message = currentLanguage === 'es' 
            ? '🎉 ¡Gracias por su interés! Nos pondremos en contacto pronto durante su ventana de tiempo preferida. 🎉'
            : '🎉 Thank you for your interest! We\'ll contact you soon during your preferred time window. 🎉';
        
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
                color: white;
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                margin: 20px 0;
                box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
                font-family: 'Fredoka One', cursive;
                font-size: 1.2rem;
            ">
                ${message}
            </div>
        `;
        
        form.parentNode.insertBefore(successDiv, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Show error message
    function showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #f44336 0%, #ef5350 100%);
                color: white;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                margin: 20px 0;
                box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
                font-family: 'Fredoka One', cursive;
                font-size: 1rem;
            ">
                ⚠️ ${message} ⚠️
            </div>
        `;
        
        form.parentNode.insertBefore(errorDiv, form);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // Add some interactive animations
    const animals = document.querySelectorAll('.animal');
    animals.forEach((animal, index) => {
        animal.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        animal.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add smooth scrolling for better UX
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add form field animations
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Add some fun interactive elements
function addJungleSounds() {
    // This would be where you'd add sound effects for the jungle theme
    // For now, we'll just add some visual feedback
    console.log('Jungle sounds would play here! 🌿🦁');
}

// Initialize any additional features when the page loads
window.addEventListener('load', function() {
    // Add a welcome animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});
