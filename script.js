// Toast Notification System
function showToast(message, type = 'success', duration = 4000) {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'check_circle' : 'error';
    toast.innerHTML = `
        <i class="material-icons toast-icon">${icon}</i>
        <div class="toast-message">${message}</div>
        <button class="toast-close" aria-label="Close toast">
            <i class="material-icons">close</i>
        </button>
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);

    const hideToast = () => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 400);
    };

    const autoHideTimer = setTimeout(hideToast, duration);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(autoHideTimer);
        hideToast();
    });

    toast.addEventListener('click', (e) => {
        if (e.target === toast || e.target.classList.contains('toast-message')) {
            clearTimeout(autoHideTimer);
            hideToast();
        }
    });

    return toast;
}

// Smooth scrolling for navigation links
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Form submission handler with toast notifications
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }

    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const loadingToast = showToast('Sending your message...', 'success', 6000);

    emailjs.send("service_wayvmfq", "template_r051j22", {
        from_name: name,
        from_email: email,
        message: message
    }).then(() => {
        if (loadingToast.parentNode) loadingToast.remove();
        showToast(`Thank you ${name}! Your message has been sent successfully.`, 'success');
        this.reset();
    }).catch((error) => {
        if (loadingToast.parentNode) loadingToast.remove();
        showToast('Oops! Something went wrong. Please try again later.', 'error');
        console.error("EmailJS error:", error);
    }).finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Interactive hover effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Floating animation for hero section
const hero = document.querySelector('.hero-content');
let floatDirection = 1;

setInterval(() => {
    floatDirection *= -1;
    hero.style.transform = `translateY(${floatDirection * 10}px)`;
}, 3000);

// Demo toast on page load (optional)
window.addEventListener('load', () => {
    setTimeout(() => {
        showToast('Welcome to my portfolio! Feel free to explore and get in touch.', 'success', 3000);
    }, 1000);
});
