      // Toast Notification System
        function showToast(message, type = 'success', duration = 4000) {
            // Remove any existing toasts
            const existingToasts = document.querySelectorAll('.toast');
            existingToasts.forEach(toast => toast.remove());

            // Create toast element
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            // Set toast content
            const icon = type === 'success' ? 'check_circle' : 'error';
            toast.innerHTML = `
                <i class="material-icons toast-icon">${icon}</i>
                <div class="toast-message">${message}</div>
                <button class="toast-close" aria-label="Close toast">
                    <i class="material-icons">close</i>
                </button>
            `;

            // Add toast to document
            document.body.appendChild(toast);

            // Show toast with animation
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);

            // Auto-hide toast
            const hideToast = () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 400);
            };

            // Set auto-hide timer
            const autoHideTimer = setTimeout(hideToast, duration);

            // Add close button functionality
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => {
                clearTimeout(autoHideTimer);
                hideToast();
            });

            // Add click to dismiss functionality
            toast.addEventListener('click', (e) => {
                if (e.target === toast || e.target.classList.contains('toast-message')) {
                    clearTimeout(autoHideTimer);
                    hideToast();
                }
            });

            return toast;
        }

        // Theme Management
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const themeText = document.getElementById('themeText');
        const mobileThemeIcon = document.getElementById('mobileThemeIcon');
        const body = document.body;

        // Check for saved theme preference or default to 'dark'
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        // Apply the current theme on page load
        if (currentTheme === 'light') {
            body.classList.add('light-mode');
            updateThemeToggle(true);
        }

        function updateThemeToggle(isLight) {
            if (isLight) {
                themeIcon.textContent = 'light_mode';
                themeText.textContent = 'Dark';
                mobileThemeIcon.textContent = 'light_mode';
            } else {
                themeIcon.textContent = 'dark_mode';
                themeText.textContent = 'Light';
                mobileThemeIcon.textContent = 'dark_mode';
            }
        }

        function toggleTheme() {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            
            // Update button appearance
            updateThemeToggle(isLight);
            
            // Save theme preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            // Add a subtle animation effect
            body.style.transition = 'all 0.3s ease';
        }

        // Add event listeners for both desktop and mobile theme toggles
        themeToggle.addEventListener('click', toggleTheme);
        mobileThemeToggle.addEventListener('click', toggleTheme);

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
            const isLight = body.classList.contains('light-mode');
            
            if (window.scrollY > 100) {
                nav.style.background = isLight ? 'rgba(248, 249, 250, 0.98)' : 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = isLight ? 'rgba(248, 249, 250, 0.95)' : 'rgba(0, 0, 0, 0.9)';
            }
        });

        // Form submission handler with toast notifications
        document.querySelector('.contact-form form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showToast('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Show loading toast
            const loadingToast = showToast('Sending your message...', 'success', 6000);
            
            setTimeout(() => {
                // Remove loading toast
                if (loadingToast.parentNode) {
                    loadingToast.remove();
                }
                
                // Show success toast
                showToast(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success', 5000);
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Add interactive hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Add floating animation to hero section
        const hero = document.querySelector('.hero-content');
        let floatDirection = 1;
        
        setInterval(() => {
            floatDirection *= -1;
            hero.style.transform = `translateY(${floatDirection * 10}px)`;
        }, 3000);

        // Keyboard accessibility for theme toggle
        document.addEventListener('keydown', function(e) {
            if (e.key === 'T' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                toggleTheme();
            }
        });

        // Demo toast on page load (optional - remove if not wanted)
        window.addEventListener('load', () => {
            setTimeout(() => {
                showToast('Welcome to my portfolio! Feel free to explore and get in touch.', 'success', 3000);
            }, 1000);
        });