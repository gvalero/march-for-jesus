/* March for Jesus — Interactivity */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
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

    // --- Scroll-triggered Fade-in Animations ---
    const fadeElements = document.querySelectorAll(
        '.about__content, .expect__card, .logistics__card, .support__content, .gallery__item, .join__card, .contact__content'
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
    document.querySelectorAll('.expect__cards, .logistics__cards, .join__cards').forEach(container => {
        const cards = container.querySelectorAll('.expect__card, .logistics__card, .join__card');
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
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailForm.querySelector('.join__email-input').value;
            const btn = emailForm.querySelector('.join__email-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Thank you!';
            btn.disabled = true;
            emailForm.querySelector('.join__email-input').value = '';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.contact__form-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Sent!';
            btn.disabled = true;
            contactForm.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }
});
