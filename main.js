/* ==============================================
   Lazaro Meneses — PORTFOLIO JS
   ============================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ---- DOM References ---- */
    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const openBtn = document.getElementById("open");
    const closeBtn = document.getElementById("close");
    const navLinks = document.querySelectorAll(".nav-link");
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("lang-toggle");
    const scrollTopBtn = document.getElementById("scroll-top");
    const typedRole = document.getElementById("typed-role");
    const contactForm = document.getElementById("contact-form");
    const formStatusElement = document.getElementById("form-status");
    const sections = document.querySelectorAll("section[id]");

    /* ===================
       TRANSLATIONS
       =================== */
    const translations = {
        en: {
            nav: {
                home: "Home",
                about: "About",
                skills: "Skills",
                projects: "Projects",
                contact: "Contact"
            },
            hero: {
                greeting: "Hello, I'm",
                description: "Building dynamic and visually engaging web experiences with modern technologies.",
                viewProjects: "View Projects",
                getInTouch: "Get in Touch",
                projects: "Projects",
                yearExp: "Year Exp.",
                technologies: "Technologies"
            },
            about: {
                title: "About Me",
                para1: "I'm an intermediate-level frontend developer passionate about building dynamic and visually engaging web experiences. I work with HTML, CSS, and JavaScript, and I'm currently learning ReactJS to take my projects to the next level.",
                para2: "What motivates me most about programming is understanding the language of the future. I'm fascinated by how, through code, we can communicate with computers and bring our ideas to life. What began as a simple curiosity has become a passion I can't let go of.",
                para3: "My current goal is to grow as a freelancer, collaborating on real-world projects that challenge me and allow me to continue learning. In the long term, I aspire to develop my own web application that reflects everything I've learned along the way."
            },
            skills: {
                title: "Skills",
                frontend: "Frontend",
                devTools: "Dev Tools",
                design: "Design"
            },
            projects: {
                title: "Projects",
                purpose: "Why was it made? (Purpose)",
                challenges: "Challenges & Development",
                technologies: "Technologies Used",
                liveDemo: "Live Demo",
                downloadApk: "Download APK"
            },
            contact: {
                title: "Get in Touch",
                subtitle: "Have a project in mind? Let's work together to bring your ideas to life.",
                email: "Email",
                phone: "Phone",
                sendMessage: "Send Message",
                namePlaceholder: "Your Name",
                emailPlaceholder: "Your Email",
                messagePlaceholder: "Your Message",
                successMessage: "Message sent successfully. Thank you!",
                errorMessage: "Please complete all fields before sending.",
                submitError: "Something went wrong. Please try again later."
            }
        },
        es: {
            nav: {
                home: "Inicio",
                about: "Sobre Mí",
                skills: "Habilidades",
                projects: "Proyectos",
                contact: "Contacto"
            },
            hero: {
                greeting: "Hola, soy",
                description: "Construyendo experiencias web dinámicas y visualmente atractivas con tecnologías modernas.",
                viewProjects: "Ver Proyectos",
                getInTouch: "Contáctame",
                projects: "Proyectos",
                yearExp: "Año Exp.",
                technologies: "Tecnologías"
            },
            about: {
                title: "Sobre Mí",
                para1: "Soy un desarrollador frontend de nivel intermedio apasionado por construir experiencias web dinámicas y visualmente atractivas. Trabajo con HTML, CSS y JavaScript, y actualmente estoy aprendiendo ReactJS para llevar mis proyectos al siguiente nivel.",
                para2: "Lo que más me motiva sobre la programación es entender el lenguaje del futuro. Me fascina cómo, a través del código, podemos comunicarnos con las computadoras y dar vida a nuestras ideas. Lo que comenzó como una simple curiosidad se ha convertido en una pasión que no puedo soltar.",
                para3: "Mi objetivo actual es crecer como freelancer, colaborando en proyectos del mundo real que me desafíen y me permitan seguir aprendiendo. A largo plazo, aspiro a desarrollar mi propia aplicación web que refleje todo lo que he aprendido en el camino."
            },
            skills: {
                title: "Habilidades",
                frontend: "Frontend",
                devTools: "Herramientas",
                design: "Diseño"
            },
            projects: {
                title: "Proyectos",
                purpose: "¿Por qué se hizo? (El Propósito)",
                challenges: "Desafíos y Desarrollo",
                technologies: "Tecnologías Utilizadas",
                liveDemo: "Ver Demo en Vivo",
                downloadApk: "Descargar APK"
            },
            contact: {
                title: "Contáctame",
                subtitle: "¿Tienes un proyecto en mente? Trabajemos juntos para dar vida a tus ideas.",
                email: "Email",
                phone: "Teléfono",
                sendMessage: "Enviar Mensaje",
                namePlaceholder: "Tu Nombre",
                emailPlaceholder: "Tu Email",
                messagePlaceholder: "Tu Mensaje",
                successMessage: "Mensaje enviado con éxito. ¡Gracias!",
                errorMessage: "Por favor completa todos los campos antes de enviar.",
                submitError: "Algo salió mal. Intenta de nuevo más tarde."
            }
        }
    };

    /* ===================
       0. LANGUAGE TOGGLE
       =================== */
    let currentLang = localStorage.getItem("portfolio-lang") || "en";

    function applyLanguage(lang) {
        // Handle text content translations
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(element => {
            const key = element.getAttribute("data-i18n");
            const keys = key.split(".");
            let translation = translations[lang];
            keys.forEach(k => {
                translation = translation[k];
            });
            if (translation) {
                element.textContent = translation;
            }
        });

        // Handle placeholder translations
        const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
        placeholderElements.forEach(element => {
            const key = element.getAttribute("data-i18n-placeholder");
            const keys = key.split(".");
            let translation = translations[lang];
            keys.forEach(k => {
                translation = translation[k];
            });
            if (translation) {
                element.placeholder = translation;
            }
        });

        langToggle.textContent = lang === "en" ? "ES" : "EN";
        currentLang = lang;
    }

    langToggle.addEventListener("click", () => {
        const newLang = currentLang === "en" ? "es" : "en";
        applyLanguage(newLang);
        localStorage.setItem("portfolio-lang", newLang);
    });

    // Apply saved language on load
    applyLanguage(currentLang);

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
    let scrollPosition = 0;

    openBtn.addEventListener("click", () => {
        scrollPosition = window.pageYOffset;
        nav.classList.add("visible");
        nav.setAttribute("aria-hidden", "false");
        openBtn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = "100%";
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
        nav.setAttribute("aria-hidden", "true");
        openBtn.setAttribute("aria-expanded", "false");
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("position");
        document.body.style.removeProperty("top");
        document.body.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
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
    if(scrollTopBtn) scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ===================
       5. SCROLL SPY — Active Nav Link
       =================== */
    function updateActiveLink() {
        // Don't update if mobile menu is open
        if (nav.classList.contains("visible")) return;

        const scrollPos = window.scrollY + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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
        if (!typedRole) return;
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
    if(contactForm) contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("form-name").value.trim();
        const email = document.getElementById("form-email").value.trim();
        const message = document.getElementById("form-message").value.trim();
        const submitBtn = document.getElementById("form-submit");

        if (!name || !email || !message) {
            if (formStatusElement) {
                formStatusElement.textContent = translations[currentLang].contact.errorMessage;
                formStatusElement.classList.add("error");
            }
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
        if (formStatusElement) {
            formStatusElement.textContent = "";
            formStatusElement.classList.remove("error", "success");
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Message Sent!';
            contactForm.classList.add("success");
            if (formStatusElement) {
                formStatusElement.textContent = translations[currentLang].contact.successMessage;
                formStatusElement.classList.add("success");
            }

            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-send"></i> ' + translations[currentLang].contact.sendMessage;
                contactForm.classList.remove("success");
                if (formStatusElement) {
                    formStatusElement.textContent = "";
                    formStatusElement.classList.remove("success");
                }
            }, 3000);
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-send"></i> ' + translations[currentLang].contact.sendMessage;
            if (formStatusElement) {
                formStatusElement.textContent = translations[currentLang].contact.submitError;
                formStatusElement.classList.add("error");
            }
        }
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
