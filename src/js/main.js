/**
 * =======================================================================
 * NEXA TECH LABS - CORE ENGINE v2.0
 * =======================================================================
 * Dikembangkan oleh: Fauzan & Triandra (NEXA Engineering)
 * Fokus: Performa, Responsivitas, dan Zero-Layout-Thrashing.
 */

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // --- 1. CONFIGURATION & SELECTORS ---
    const selectors = {
        navbar: 'nexaNavbar',
        mobileBtn: 'mobileMenuBtn',
        mobileMenu: 'mobileMenu',
        menuIcon: 'menuIcon',
        closeIcon: 'closeIcon',
        revealEls: '.animate-fade-in, .animate-slide-up',
        footerYear: '#currentYear'
    };

    // --- 2. MOBILE MENU ENGINE (Refined Logic) ---
    const initMobileMenu = () => {
        const btn = document.getElementById(selectors.mobileBtn);
        const menu = document.getElementById(selectors.mobileMenu);
        const iconOpen = document.getElementById(selectors.menuIcon);
        const iconClose = document.getElementById(selectors.closeIcon);

        if (!btn || !menu) return; // Guard Clause

        const toggleMenu = () => {
            const isHidden = menu.classList.toggle('hidden');
            if (iconOpen && iconClose) {
                iconOpen.classList.toggle('hidden', !isHidden);
                iconClose.classList.toggle('hidden', isHidden);
            }
            // Mencegah scroll body saat menu terbuka
            document.body.style.overflow = isHidden ? '' : 'hidden';
        };

        btn.addEventListener('click', toggleMenu);

        // Tutup menu jika link di dalamnya diklik
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!menu.classList.contains('hidden')) toggleMenu();
            });
        });
    };

    // --- 3. SMART NAVBAR (Throttled Scroll) ---
    const initNavbarScroll = () => {
        const nav = document.getElementById(selectors.navbar);
        if (!nav) return;

        let lastKnownScrollPosition = 0;
        let ticking = false;

        const handleScroll = (scrollPos) => {
            if (scrollPos > 50) {
                nav.classList.add('shadow-xl', 'bg-white/95', 'backdrop-blur-md', 'py-2');
                nav.classList.remove('py-4');
            } else {
                nav.classList.remove('shadow-xl', 'bg-white/95', 'backdrop-blur-md', 'py-2');
                nav.classList.add('py-4');
            }
        };

        window.addEventListener('scroll', () => {
            lastKnownScrollPosition = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll(lastKnownScrollPosition);
                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // --- 4. SCROLL REVEAL ENGINE (Intersection Observer) ---
    const initScrollReveal = () => {
        const elements = document.querySelectorAll(selectors.revealEls);
        if (elements.length === 0) return;

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('active'); // Pastikan CSS kamu punya .active { opacity: 1; transform: none; }
                    el.style.animationPlayState = 'running';
                    observer.unobserve(el); // Berhenti observasi setelah muncul (performa)
                }
            });
        }, revealOptions);

        elements.forEach(el => observer.observe(el));
    };

    // --- 5. AUTOMATIC YEAR UPDATER ---
    const initFooter = () => {
        const yearEl = document.querySelector(selectors.footerYear);
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    };

    // --- 6. INITIALIZE ALL ENGINES ---
    try {
        initMobileMenu();
        initNavbarScroll();
        initScrollReveal();
        initFooter();
        console.log("🚀 NEXA Core Engine: Operational (Ready to Scale)");
    } catch (error) {
        console.error("❌ NEXA Core Engine Error:", error);
    }
});