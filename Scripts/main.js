// ZingStore JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const serviceCards = document.querySelectorAll('.service-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const contactForm = document.querySelector('.contact-form form');
    const orderButtons = document.querySelectorAll('.btn-order');

    // Navigation functionality
    function showSection(targetId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        // Show target section with fade up animation
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Trigger fade up animation
            setTimeout(() => {
                targetSection.classList.add('active', 'fade-up');
            }, 50);
        }
    }

    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetSection = this.getAttribute('data-section');
            
            // Show target section
            showSection(targetSection);
        });
    });

    // Service card hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature card animations
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-up');
    });

    // Order button click handlers
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.parentElement.querySelector('h3').textContent;
            
            // Create WhatsApp message
            const message = `Halo, saya tertarik dengan layanan ${serviceName} di ZingStore. Bisa dibantu informasi lebih lanjut?`;
            const whatsappUrl = `https://wa.me/6285755306576?text=${encodeURIComponent(message)}`;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                window.open(whatsappUrl, '_blank');
            }, 150);
        });
    });

    // Contact form handler
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !message) {
                alert('Mohon lengkapi semua field!');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Halo ZingStore!\n\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`;
            const whatsappUrl = `https://wa.me/6285755306576?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Show success message
            alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan komunikasi.');
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
        });
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
            }
        });
    }, observerOptions);

    // Observe service cards
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }

    // Mobile menu toggle (for responsive design)
    function createMobileMenu() {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            toggleBtn.className = 'mobile-menu-toggle';
            toggleBtn.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1001;
                background: #667eea;
                color: white;
                border: none;
                padding: 0.5rem;
                border-radius: 5px;
                cursor: pointer;
                display: none;
            `;
            
            document.body.appendChild(toggleBtn);
            
            // Toggle functionality
            toggleBtn.addEventListener('click', function() {
                sidebar.style.transform = sidebar.style.transform === 'translateX(0px)' ? 'translateX(-100%)' : 'translateX(0px)';
            });
            
            // Show toggle button on mobile
            if (window.innerWidth <= 768) {
                toggleBtn.style.display = 'block';
            }
        }
    }

    // Initialize mobile menu
    createMobileMenu();

    // Handle window resize
    window.addEventListener('resize', function() {
        createMobileMenu();
    });

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallax = hero.querySelector('h1');
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }
    }

    // Initialize parallax effect
    parallaxEffect();

    // Add loading animation to service cards
    function addLoadingAnimation() {
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Initialize loading animation
    setTimeout(addLoadingAnimation, 500);

    // Add ripple effect to buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn-order, .contact-form button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize ripple effect
    addRippleEffect();

    // Service card counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 200;
            
            function updateCounter() {
                const current = +counter.innerText;
                
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            }
            
            updateCounter();
        });
    }

    // Initialize counter animation when in view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    });

    // Observe counter elements
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Smooth page transitions
    function smoothPageTransition() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    // Initialize smooth page transition
    smoothPageTransition();

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const sidebar = document.querySelector('.sidebar');
            if (sidebar.style.transform === 'translateX(0px)') {
                sidebar.style.transform = 'translateX(-100%)';
            }
        }
    });

    // Add focus management for accessibility
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            this.style.outline = '2px solid #667eea';
        });
        
        link.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    console.log('ZingStore website loaded successfully!');
});