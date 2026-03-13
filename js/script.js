/* March for Jesus — Interactivity */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // --- Dropdown Menus (mobile tap to expand) ---
    const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
    const isMobile = () => window.innerWidth <= 768;

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav__link');
        link.addEventListener('click', (e) => {
            if (isMobile()) {
                e.preventDefault();
                const wasOpen = item.classList.contains('open');
                dropdownItems.forEach(d => d.classList.remove('open'));
                if (!wasOpen) item.classList.add('open');
            }
        });
    });

    // Close menu when a dropdown link is clicked
    navMenu.querySelectorAll('.nav__dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            dropdownItems.forEach(d => d.classList.remove('open'));
        });
    });

    // Close menu when a top-level link is clicked (desktop)
    navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (!isMobile()) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function setActiveLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop - 80;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();

    // --- Countdown Timer ---
    const marchDate = new Date('2026-05-16T10:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = marchDate - now;

        if (diff <= 0) {
            document.getElementById('countdownDays').textContent = '0';
            document.getElementById('countdownHours').textContent = '00';
            document.getElementById('countdownMinutes').textContent = '00';
            document.getElementById('countdownSeconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdownDays').textContent = days;
        document.getElementById('countdownHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdownMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdownSeconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // --- Scroll-triggered Fade-in Animations ---
    const fadeElements = document.querySelectorAll(
        '.about__content, .logistics__card, .support__content, .gallery__item, .join__card, .contact__content'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(el => observer.observe(el));

    // --- Staggered card animations ---
    document.querySelectorAll('.logistics__cards, .join__cards').forEach(container => {
        const cards = container.querySelectorAll('.logistics__card, .join__card');
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        cards.forEach((card, i) => {
                            setTimeout(() => card.classList.add('visible'), i * 150);
                        });
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        cardObserver.observe(container);
    });

    // --- Email Signup Form ---
    const emailForm = document.getElementById('emailSignupForm');
    if (emailForm) {
        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = emailForm.querySelector('.contact__signup-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = {
                email: emailForm.querySelector('[name="email"]').value,
                name: emailForm.querySelector('[name="name"]').value,
                last_name: emailForm.querySelector('[name="last_name"]').value,
                phone: emailForm.querySelector('[name="phone"]')?.value || '',
                church: emailForm.querySelector('[name="church"]')?.value || '',
                form_type: 'website_signup'
            };

            try {
                const response = await fetch('https://mfj-mailerlite-proxy.valerogian.workers.dev', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    gtag('event', 'generate_lead', {
                        event_category: 'signup',
                        event_label: 'email_signup'
                    });
                    btn.textContent = 'Thank you!';
                    emailForm.reset();
                } else {
                    btn.textContent = 'Error — try again';
                }
            } catch (err) {
                btn.textContent = 'Error — try again';
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.contact__form-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = {
                email: document.getElementById('contactEmail').value,
                name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                phone: document.getElementById('phone')?.value || '',
                form_type: 'contact_form'
            };

            try {
                const response = await fetch('https://mfj-mailerlite-proxy.valerogian.workers.dev', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    gtag('event', 'contact', {
                        event_category: 'engagement',
                        event_label: 'contact_form'
                    });
                    btn.textContent = 'Sent!';
                    contactForm.reset();
                } else {
                    btn.textContent = 'Error — try again';
                }
            } catch (err) {
                btn.textContent = 'Error — try again';
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }
});
