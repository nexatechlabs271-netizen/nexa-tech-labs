/**
 * =======================================================================
 * [NEXA.SYS] - CORE ENGINE v3.0 (Terminal Protocol)
 * =======================================================================
 * Architect : M. Fauzan Al Farikhi & Mochamad Triandra Andantyo
 * Focus     : Zero-Layout-Thrashing, Hardware-Accelerated VFX, 
 * & Centralized Event Routing.
 * =======================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // --- [SYS.INIT] BOOT SEQUENCE ---
    console.log("%c[NEXA_SYS] Core Engine v3.0 Initialized.", "color: #38E4DA; font-family: monospace; font-size: 12px;");
    console.log("%c[NEXA_SYS] Enforcing zero-trust rendering.", "color: #38E4DA; font-family: monospace; font-size: 12px;");

    // --- 1. DYNAMIC NAVIGATION (Glassmorphism & Shadow Routing) ---
    const initNavEngine = () => {
        const nav = document.getElementById('mainNav');
        if (!nav) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNav = () => {
            if (lastScrollY > 50) {
                nav.style.background = 'rgba(4, 11, 20, 0.95)';
                nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                nav.style.paddingTop = '1rem';
                nav.style.paddingBottom = '1rem';
            } else {
                nav.style.background = 'rgba(4, 11, 20, 0.85)';
                nav.style.boxShadow = 'none';
                nav.style.paddingTop = '1.25rem';
                nav.style.paddingBottom = '1.25rem';
            }
            ticking = false;
        };

        // Initialize state
        updateNav();

        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });
    };

    // --- 2. HOLOGRAPHIC MOUSE TRACKING (Card Glow Engine) ---
    // Menggabungkan semua selector kartu yang menggunakan efek hover cahaya
    const initGlowEngine = () => {
        const glowTargets = document.querySelectorAll('.glass-panel, .team-card, .pricing-card, .workflow-card, .tactical-box');
        
        if(glowTargets.length === 0) return;

        glowTargets.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    // --- 3. SCROLL REVEAL ENGINE (Intersection Observer) ---
    const initRevealEngine = () => {
        const revealElements = document.querySelectorAll('.reveal, .reveal-blur');
        if (revealElements.length === 0) return;

        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve setelah trigger pertama untuk efisiensi memori (opsional)
                    // observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    };

    // --- 4. MOBILE COMMS NODE (Mobile Menu Toggle) ---
    const initMobileMenu = () => {
        const mobileBtn = document.querySelector('button.lg\\:hidden');
        const navContainer = document.getElementById('mainNav');
        
        if (!mobileBtn || !navContainer) return;

        // Note: Implementasi menu mobile (dropdown) bisa di-inject di sini
        // Saat ini fokus pada trigger button
        mobileBtn.addEventListener('click', () => {
            console.log("[SYS] Mobile menu triggered.");
            // Logika dropdown / sidebar menu mobile Anda...
        });
    };

    // --- 5. EXECUTE ALL PROTOCOLS ---
    try {
        initNavEngine();
        initGlowEngine();
        initRevealEngine();
        initMobileMenu();
        
        console.log("%c[NEXA_SYS] All visual protocols active. Awaiting user input.", "color: #22c55e; font-family: monospace; font-size: 11px;");
    } catch (error) {
        console.error("%c[SYS.CRITICAL] Engine failure:", "color: #ef4444; font-weight: bold;", error);
    }
});

/**
 * Global Utility: Smooth Scroll Override
 * Mencegah loncatan kasar saat klik anchor link
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});