// Language selection functionality
let currentLanguage = 'en';

// Function to get English field names
function getEnglishFieldName(field) {
    const fieldNames = {
        'firstName': 'parent\'s first name',
        'lastName': 'parent\'s last name',
        'email': 'email address',
        'phone': 'phone number',
        'childAge': 'child\'s age',
        'childObservations': 'child observations'
    };
    return fieldNames[field] || field;
}

// Function to get Spanish field names
function getSpanishFieldName(field) {
    const fieldNames = {
        'firstName': 'nombre del padre/madre',
        'lastName': 'apellido del padre/madre',
        'email': 'correo electrónico',
        'phone': 'teléfono',
        'childAge': 'edad del niño',
        'childObservations': 'observaciones del niño'
    };
    return fieldNames[field] || field;
}

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
    
    // Special handling for phone number with strong tag
    const phoneElement = document.querySelector('.contact-info p');
    if (phoneElement) {
        if (lang === 'es') {
            phoneElement.innerHTML = 'Llámenos o envíenos un mensaje al: <strong>908-798-8373</strong>';
        } else {
            phoneElement.innerHTML = 'Call or Text us at: <strong>908-798-8373</strong>';
        }
    }
    
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
    
    // Update checkbox labels
    const checkboxLabels = document.querySelectorAll('.checkbox-item label[data-en][data-es]');
    checkboxLabels.forEach(label => {
        if (lang === 'es') {
            label.textContent = label.getAttribute('data-es');
        } else {
            label.textContent = label.getAttribute('data-en');
        }
    });

    updateLanguageSwitch(lang);
}

function updateLanguageSwitch(lang) {
    const languageSwitch = document.getElementById('languageSwitch');
    if (!languageSwitch) return;

    if (lang === 'es') {
        languageSwitch.textContent = languageSwitch.getAttribute('data-label-en') || 'See in English';
        languageSwitch.setAttribute('aria-label', languageSwitch.getAttribute('data-aria-en') || 'Switch the site to English');
    } else {
        languageSwitch.textContent = languageSwitch.getAttribute('data-label-es') || 'Ver en Español';
        languageSwitch.setAttribute('aria-label', languageSwitch.getAttribute('data-aria-es') || 'Cambiar el sitio a Español');
    }
}

// Check for saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitch = document.getElementById('languageSwitch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', function() {
            const nextLanguage = currentLanguage === 'en' ? 'es' : 'en';
            selectLanguage(nextLanguage);
        });
    }

    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        selectLanguage(savedLanguage);
    } else {
        updateLanguageSwitch(currentLanguage);
    }
});

document.addEventListener('DOMContentLoaded', function() {
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
