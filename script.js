// LV Infotech Services - Main Script

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const body = document.querySelector('body');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            // Prevent scrolling when menu is open
            if (nav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });
    }

    // 2. Dropdown Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggleBtn = dropdown.querySelector('.dropdown-toggle');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                // Only for mobile/tablet where hover doesn't exist
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // 3. Close mobile menu when clicking a link
    const allNavLinks = document.querySelectorAll('.nav-list a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // If it's not a dropdown toggle or if we're on desktop
            if (!link.classList.contains('dropdown-toggle') || window.innerWidth > 992) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    });

    // 4. Sticky Header & Active Link Highlight on Scroll
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
        }

        // Active Link Highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // -100 to offset header height
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') && li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // 5. Smooth Scroll for Anchor Links (Polyfill-like behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent smooth scroll if it's a dropdown toggle on mobile
            if (this.classList.contains('dropdown-toggle') && window.innerWidth <= 992) {
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetContent = document.querySelector(targetId);
            if (targetContent) {
                window.scrollTo({
                    top: targetContent.offsetTop - 80, // Header height offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Form Handling (Demo)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you! We have received your message and will get back to you shortly.');
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
