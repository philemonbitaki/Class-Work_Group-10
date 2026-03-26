// Hero section animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate hero elements on page load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.8s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroDescription.style.transition = 'all 0.8s ease';
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }, 900);
    }
    
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroButtons.style.transition = 'all 0.8s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 1200);
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = '';
            span.style.opacity = '';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            
            // Animate stats when visible
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .program-card, .news-card, .stats');
    animateElements.forEach(el => observer.observe(el));
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form validation (for registration form)
const validateForm = (form) => {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            clearError(input);
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(input.value)) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });
    
    return isValid;
};

const showError = (input, message) => {
    clearError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#E74C3C';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#E74C3C';
};

const clearError = (input) => {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
};

// Registration form handling
const registrationForm = document.querySelector('#registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm(registrationForm)) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div style="background: #27AE60; color: white; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
                    <h3>Registration Successful!</h3>
                    <p>Thank you for registering. We will contact you soon.</p>
                </div>
            `;
            
            registrationForm.parentNode.insertBefore(successMessage, registrationForm);
            registrationForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

// Add input event listeners for real-time validation
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, 'This field is required');
        } else {
            clearError(input);
        }
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            clearError(input);
        }
    });
});

// Loading animation
const showLoading = () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #4A90E2; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    document.body.appendChild(loader);
};

const hideLoading = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
};

// Add CSS animation for loader
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Search functionality (if needed)
const initSearch = () => {
    const searchInput = document.querySelector('#searchInput');
    const searchResults = document.querySelector('#searchResults');
    
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length > 2) {
                // Perform search (mock implementation)
                const results = performSearch(query);
                displaySearchResults(results, searchResults);
            } else {
                searchResults.innerHTML = '';
            }
        });
    }
};

const performSearch = (query) => {
    // Mock search implementation
    const pages = [
        { title: 'Computer Science Program', url: 'programs.html#bcs' },
        { title: 'Information Technology Program', url: 'programs.html#bit' },
        { title: 'Web Development Diploma', url: 'programs.html#dwd' },
        { title: 'Department Information', url: 'department.html' },
        { title: 'Staff Directory', url: 'staff.html' },
        { title: 'Student Registration', url: 'registration.html' }
    ];
    
    return pages.filter(page => 
        page.title.toLowerCase().includes(query)
    );
};

const displaySearchResults = (results, container) => {
    container.innerHTML = results.map(result => `
        <div class="search-result" style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">
            <a href="${result.url}" style="color: #4A90E2; text-decoration: none;">
                ${result.title}
            </a>
        </div>
    `).join('');
};

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);

// Print functionality
const initPrint = () => {
    const printButtons = document.querySelectorAll('.print-btn');
    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.print();
        });
    });
};

document.addEventListener('DOMContentLoaded', initPrint);

// Theme toggle (optional feature)
const initThemeToggle = () => {
    const themeToggle = document.querySelector('#themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }
};

document.addEventListener('DOMContentLoaded', initThemeToggle);

// Add dark theme CSS variables
const darkThemeStyle = document.createElement('style');
darkThemeStyle.textContent = `
    body.dark-theme {
        --bg-color: #1a1a1a;
        --bg-light: #2d2d2d;
        --bg-lighter: #404040;
        --text-color: #ffffff;
        --text-light: #cccccc;
        --text-lighter: #999999;
        --border-color: #404040;
    }
    
    body.dark-theme .header {
        background: #2d2d2d;
    }
    
    body.dark-theme .feature-card,
    body.dark-theme .program-card,
    body.dark-theme .news-card {
        background: #2d2d2d;
        color: #ffffff;
    }
`;
document.head.appendChild(darkThemeStyle);

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll event
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can go here
}, 100));

// Console log for debugging
console.log('Department Website JavaScript loaded successfully!');
