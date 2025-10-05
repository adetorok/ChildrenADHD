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
        'adhdDiagnosis': 'ADHD diagnosis'
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
        'adhdDiagnosis': 'diagnóstico de TDAH'
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
        // Get form data snapshot for validation
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Collect selected contact days (labels must match Google options exactly)
        const selectedDays = [];
        const dayCheckboxes = document.querySelectorAll('input[name="contactDays"]:checked');
        dayCheckboxes.forEach(cb => {
            const label = form.querySelector('label[for="' + cb.id + '"]');
            selectedDays.push(label ? label.getAttribute('data-en') : cb.value);
        });
        data.contactDays = selectedDays.join(', ');

        // Basic validation
        if (!validateForm(data)) {
            e.preventDefault();
            return;
        }

        // Map to Google Forms entry IDs using hidden inputs
        // Provided mapping
        const mapping = {
            firstName: 'entry.1864032579',
            lastName: 'entry.1011458932',
            email: 'entry.1205316784',
            phone: 'entry.1598274613',
            childAge: 'entry.457910368',
            adhdDiagnosis: 'entry.893214756',
            referralParent: 'entry.2044871539',
            contactDays: 'entry.556123987',
            contactTime: 'entry.1187459630',
            comments: 'entry.1987654321'
        };

        // Remove any prior temp hidden fields
        const oldTemps = form.querySelectorAll('.gf-temp');
        oldTemps.forEach(n => n.remove());

        // Helper to append hidden input
        function appendHidden(name, value) {
            if (value == null || value === '') return;
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            input.className = 'gf-temp';
            form.appendChild(input);
        }

        // First/Last name
        appendHidden(mapping.firstName, document.getElementById('firstName').value.trim());
        appendHidden(mapping.lastName, document.getElementById('lastName').value.trim());
        // Email/Phone
        appendHidden(mapping.email, document.getElementById('email').value.trim());
        appendHidden(mapping.phone, document.getElementById('phone').value.trim());

        // Child age: send the visible text that matches Google options
        const childAgeEl = document.getElementById('childAge');
        const childAgeText = childAgeEl.options[childAgeEl.selectedIndex]?.getAttribute('data-en') || '';
        appendHidden(mapping.childAge, childAgeText);

        // ADHD diagnosis: send "Yes" or "No"
        const diagEl = document.getElementById('adhdDiagnosis');
        const diagText = diagEl.options[diagEl.selectedIndex]?.getAttribute('data-en') || '';
        appendHidden(mapping.adhdDiagnosis, diagText);

        // Referral parent
        appendHidden(mapping.referralParent, document.getElementById('referralParent').value.trim());

        // Contact days: each selection needs a separate field of same entry ID
        selectedDays.forEach(day => appendHidden(mapping.contactDays, day));

        // Contact time: send visible text that matches Google option
        const timeEl = document.getElementById('contactTime');
        const timeText = timeEl.options[timeEl.selectedIndex]?.getAttribute('data-en') || '';
        appendHidden(mapping.contactTime, timeText);

        // Comments
        appendHidden(mapping.comments, document.getElementById('comments').value.trim());

        // Show success overlay; allow normal submit to hidden iframe
        showSuccessMessage();

        // Reset form after a short delay (does not affect submission)
        setTimeout(() => {
            form.reset();
        }, 2000);
    });
    
    // Listen for successful form submission
    const hiddenIframe = document.getElementById('hidden_iframe');
    hiddenIframe.addEventListener('load', function() {
        // This fires when the form has been submitted to Google Forms
        console.log('Form submitted to Google Forms successfully');
    });
    
    // Form validation
    function validateForm(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'childAge', 'adhdDiagnosis'];
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                const translatedFieldName = currentLanguage === 'es' 
                    ? getSpanishFieldName(field)
                    : getEnglishFieldName(field);
                showError(`${currentLanguage === 'es' ? 'Por favor complete el campo' : 'Please fill in the'} ${translatedFieldName}.`);
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            const message = currentLanguage === 'es' 
                ? 'Por favor ingrese una dirección de correo electrónico válida.'
                : 'Please enter a valid email address.';
            showError(message);
            return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            const message = currentLanguage === 'es' 
                ? 'Por favor ingrese un número de teléfono válido.'
                : 'Please enter a valid phone number.';
            showError(message);
            return false;
        }
        
        return true;
    }
    
    // Show success message
    function showSuccessMessage() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        // Create success message box
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            font-family: 'Fredoka One', cursive;
            font-size: 1.3rem;
            max-width: 500px;
            margin: 20px;
            position: relative;
            animation: slideIn 0.5s ease-out;
        `;
        
        const message = currentLanguage === 'es' 
            ? '🎉 ¡Formulario enviado exitosamente! Hemos recibido su información y un miembro de nuestro equipo se pondrá en contacto con usted en breve. 🎉'
            : '🎉 Form submitted successfully! We have received your information and a team member will get back to you shortly. 🎉';
        
        messageBox.innerHTML = message;
        overlay.appendChild(messageBox);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(overlay);
        
        // Remove overlay after 5 seconds with animation
        setTimeout(() => {
            messageBox.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.head.removeChild(style);
            }, 500);
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
