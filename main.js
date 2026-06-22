/* ==============================================
   LAZARUS MENESES — PORTFOLIO JS
   ============================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ---- DOM References ---- */
    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const openBtn = document.getElementById("open");
    const closeBtn = document.getElementById("close");
    const navLinks = document.querySelectorAll(".nav-link");
    const themeToggle = document.getElementById("theme-toggle");
    const scrollTopBtn = document.getElementById("scroll-top");
    const typedRole = document.getElementById("typed-role");
    const contactForm = document.getElementById("contact-form");
    const sections = document.querySelectorAll("section[id]");

    /* ===================
       1. THEME TOGGLE
       =================== */
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        applyTheme(next);
        localStorage.setItem("portfolio-theme", next);
    });

    function applyTheme(theme) {
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            document.documentElement.removeAttribute("data-theme");
            themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        }
    }

    /* ===================
       2. MOBILE MENU
       =================== */
    openBtn.addEventListener("click", () => {
        nav.classList.add("visible");
        document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", closeMenu);

    // Close menu on link click
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("visible")) {
            closeMenu();
        }
    });

    function closeMenu() {
        nav.classList.remove("visible");
        document.body.style.overflow = "";
    }

    /* ===================
       3. HEADER SCROLL EFFECT
       =================== */
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        // Sticky header background
        if (scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Show/hide scroll-to-top
        if (scrollY > 500) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }

        lastScroll = scrollY;
    });

    /* ===================
       4. SCROLL TO TOP
       =================== */
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ===================
       5. SCROLL SPY — Active Nav Link
       =================== */
    function updateActiveLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    /* ===================
       6. TYPING EFFECT
       =================== */
    const roles = [
        "Front-End Developer",
        "React.js Developer",
        "UI / UX Enthusiast",
        "Freelancer",
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseBetween = 2000;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            // Typing
            typedRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                // Pause before deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeEffect();
                }, pauseBetween);
                return;
            }

            setTimeout(typeEffect, typeSpeed);
        } else {
            // Deleting
            typedRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, typeSpeed * 3);
                return;
            }

            setTimeout(typeEffect, deleteSpeed);
        }
    }

    typeEffect();

    /* ===================
       7. INTERSECTION OBSERVER — Scroll Animations
       =================== */
    const fadeElements = document.querySelectorAll(".fade-in");

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach((el) => fadeObserver.observe(el));

    /* ===================
       8. CONTACT FORM HANDLER
       =================== */
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("form-name").value.trim();
        const email = document.getElementById("form-email").value.trim();
        const message = document.getElementById("form-message").value.trim();

        if (!name || !email || !message) return;

        // Build mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        const mailtoLink = `mailto:lazarojosemenesesperez@gmail.com?subject=${subject}&body=${body}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success state
        const submitBtn = document.getElementById("form-submit");
        submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Message Sent!';
        contactForm.classList.add("success");

        // Reset after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
            contactForm.classList.remove("success");
        }, 3000);
    });

    /* ===================
       9. SMOOTH SCROLL for nav links (enhanced)
       =================== */
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
});