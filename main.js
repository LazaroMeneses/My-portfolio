/* ==============================================
   Lazaro Meneses — PORTFOLIO JS
   ============================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ---- EmailJS Configuration ---- */
    // Initialize EmailJS with your public key
    // Get your credentials from https://dashboard.emailjs.com/
    const EMAILJS_PUBLIC_KEY = "fgMHfGsfMeq9suUxL"; // Replace with your actual public key
    const EMAILJS_SERVICE_ID = "service_ltfwx5v"; // Replace with your service ID
    const EMAILJS_TEMPLATE_ID_CLIENT = "template_s08qj59"; // Template for confirmation email to client
    const EMAILJS_TEMPLATE_ID_OWNER = "template_vexxutp"; // Template for message to you

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log("EmailJS initialized successfully");
    }

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
       0. PRELOADER ANIMATION (Synchronized Progress Line with Welcome Transition)
       =================== */
    const preloader = document.getElementById("preloader");
    const letters = document.querySelectorAll(".loader-brand-text .letter");
    const loaderBar = document.querySelector(".loader-bar");
    const logoWrapper = document.querySelector(".loader-logo-wrapper");
    const welcomeText = document.getElementById("loader-welcome");

    document.body.classList.add("preloader-active");

    if (preloader && letters.length > 0 && loaderBar && logoWrapper && welcomeText) {
        let currentLetterIdx = 0;

        // Initial setup after a short delay
        setTimeout(() => {
            const revealInterval = setInterval(() => {
                if (currentLetterIdx < letters.length) {
                    const letter = letters[currentLetterIdx];
                    letter.classList.add("reveal");

                    // Synchronize progress line width with the count of letters written
                    const progressPercentage = ((currentLetterIdx + 1) / letters.length) * 100;
                    loaderBar.style.width = `${progressPercentage}%`;

                    currentLetterIdx++;
                } else {
                    clearInterval(revealInterval);

                    // 1. Wait a moment at 100% load
                    setTimeout(() => {
                        // 2. Fade out logo, name and progress line
                        logoWrapper.classList.add("fade-out-content");

                        // 3. Set translated welcome message
                        const preloaderLang = localStorage.getItem("portfolio-lang") || "es";
                        welcomeText.textContent = preloaderLang === "en" ? "Welcome" : "¡Bienvenido!";

                        // 4. Fade in Welcome text
                        setTimeout(() => {
                            welcomeText.classList.add("reveal");

                            // 5. Dismiss preloader after reading the message
                            setTimeout(() => {
                                preloader.classList.add("fade-out");
                                document.body.classList.remove("preloader-active");
                                setTimeout(() => {
                                    preloader.style.display = "none";
                                }, 600);
                            }, 1200);
                        }, 200);
                    }, 400);
                }
            }, 80); // fast typing speed
        }, 400);
    } else {
        document.body.classList.remove("preloader-active");
        if (preloader) preloader.style.display = "none";
    }

    /* ===================
       TRANSLATIONS
       =================== */
    const translations = {
        en: {
            nav: {
                home: "Home",
                about: "About",
                skills: "Skills",
                services: "Services",
                projects: "Projects",
                faq: "FAQ",
                contact: "Contact"
            },
            hero: {
                greeting: "Hello, I'm",
                description: "I build robust and scalable full-stack web applications, connecting fast, intuitive frontends with secure APIs and databases.",
                viewProjects: "View Projects",
                getInTouch: "Get in Touch",
                projects: "Projects Completed",
                yearExp: "Years of Experience",
                technologies: "Tech Skills"
            },
            about: {
                title: "About Me",
                para1: "I am Lázaro Meneses, a passionate Full-Stack Developer dedicated to creating modern, functional, and user-centric digital solutions. My expertise ranges from developing interfaces and user experiences to building APIs, servers, and database architectures.",
                para2: "I work primarily with JavaScript, React.js, Node.js, Express, MongoDB, and Firebase, blending engineering, creativity, and constant learning to transform ideas into high-quality digital products.",
                para3: "What motivates me most about programming is understanding the language of the future. I am fascinated by how, through code, we can communicate with machines and bring ideas to life. What began as curiosity has become a long-term passion for building useful, scalable products.",
                downloadCv: "Download CV",
                collab: "Let's Collaborate",
                tabValues: "Core Values",
                tabJourney: "My Journey",
                val1Title: "Clean Code",
                val1Desc: "Writing readable, maintainable, and structured code following industry standards.",
                val2Title: "Performance",
                val2Desc: "Optimizing loading speeds, logic cycles, and API response times for fast products.",
                val3Title: "UX / UI Focus",
                val3Desc: "Creating fully responsive interfaces that look polished and feel intuitive on any device.",
                val4Title: "Adaptability",
                val4Desc: "Constantly learning and adapting to new web standards and libraries to solve problems.",
                j1Title: "The Spark",
                j1Desc: "Started building landing pages and responsive layouts, discovering deep passion for coding and logic.",
                j2Title: "Full-Stack Scale",
                j2Desc: "Mastered React.js and backend integrations (Node, Express, MongoDB) to build complete applications.",
                j3Title: "High-End Products",
                j3Desc: "Creating advanced portfolios, scalable databases, and rich custom animations for top-tier websites."
            },
            skills: {
                title: "Skills",
                frontend: "Frontend",
                backend: "Backend",
                devTools: "Dev Tools",
                design: "Design"
            },
            services: {
                title: "Services & Expertise",
                s1Title: "Back-End Development",
                s1Desc: "Node.js, Express, MongoDB, and Firebase solutions for APIs, servers, databases, and complete full-stack applications.",
                s2Title: "Responsive UI/UX",
                s2Desc: "Clean and mobile-friendly experiences designed to look great on desktop, tablet, and smartphone while keeping usability high.",
                s3Title: "SEO & Performance",
                s3Desc: "Semantic markup, optimized content structure, fast loading pages, and search-friendly architecture to improve visibility in Google."
            },
            projects: {
                title: "Projects",
                purpose: "Why was it made? (Purpose)",
                challenges: "Challenges & Development",
                technologies: "Technologies Used",
                liveDemo: "Live Details Page",
                livePage: "Live Website",
                downloadApk: "Download APK",
                filterAll: "All",
                filterReact: "React.js",
                filterVanilla: "HTML / CSS / JS",
                back: "Back to Portfolio",
                dateLabel: "Date",
                categoryLabel: "Category",
                siteLabel: "Website"
            },
            faq: {
                title: "Frequently Asked Questions",
                q1: "What services do you offer?",
                a1: "I build modern full-stack web applications, responsive landing pages, and complete digital solutions with React.js, Node.js, Express, MongoDB, and Firebase.",
                q2: "Do you work with both frontend and backend?",
                a2: "Yes. As a full-stack developer, I handle everything from user interfaces and experiences to APIs, servers, databases, and complete application architecture.",
                q3: "Can you improve an existing website?",
                a3: "Absolutely. I can help redesign, optimize, and improve the structure, speed, SEO, and functionality of existing websites or applications."
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
                successMessage: "Message sent successfully! I'll get back to you soon.",
                errorMessage: "Please complete all fields before sending.",
                submitError: "Failed to send message. Please try again or contact me directly via email.",
                stepName: "Name",
                stepEmail: "Email",
                stepMsg: "Message",
                step1Title: "Let's start! What is your name?",
                step2Title: "Awesome! Where can we reply back?",
                step3Title: "Almost there! Write down your message or idea.",
                next: "Next",
                back: "Back"
            },
            preloader: {
                welcome: "Welcome"
            },
            footer: {
                desc: "Full-stack developer focused on building high-performance, responsive web applications and elegant user interfaces.",
                linksTitle: "Quick Links",
                contactTitle: "Contact Info",
                madeWith: "Made with ❤️ by Lazaro Meneses"
            }
        },
        es: {
            nav: {
                home: "Inicio",
                about: "Sobre Mí",
                skills: "Habilidades",
                services: "Servicios",
                projects: "Proyectos",
                faq: "Preguntas Frecuentes",
                contact: "Contacto"
            },
            hero: {
                greeting: "Hola, soy",
                description: "Desarrollo aplicaciones web full-stack robustas y escalables, conectando interfaces rápidas e intuitivas con APIs y bases de datos seguras.",
                viewProjects: "Ver Proyectos",
                getInTouch: "Contáctame",
                projects: "Proyectos Realizados",
                yearExp: "Años de Experiencia",
                technologies: "Habilidades Técnicas"
            },
            about: {
                title: "Sobre Mí",
                para1: "Soy Lázaro Meneses, Full-Stack Developer apasionado por crear soluciones digitales modernas y funcionales. Mi experiencia abarca desde el desarrollo de interfaces y experiencias de usuario hasta la creación de APIs, servidores y bases de datos.",
                para2: "Trabajo principalmente con JavaScript, React, Node.js, Express, MongoDB y Firebase, combinando desarrollo, creatividad y aprendizaje constante para transformar ideas en productos digitales reales.",
                para3: "Lo que más me motiva sobre la programación es entender el lenguaje del futuro. Me fascina cómo, a través del código, podemos comunicarnos con las computadoras y dar vida a nuestras ideas. Lo que comenzó como curiosidad se ha convertido en una pasión a largo plazo por construir productos útiles.",
                downloadCv: "Descargar CV",
                collab: "Colaboremos",
                tabValues: "Valores Clave",
                tabJourney: "Mi Trayectoria",
                val1Title: "Código Limpio",
                val1Desc: "Escribir código legible, mantenible y estructurado siguiendo los estándares de la industria.",
                val2Title: "Rendimiento",
                val2Desc: "Optimizar la velocidad de carga, lógica de ejecución y llamadas a APIs para un rendimiento veloz.",
                val3Title: "Enfoque UI/UX",
                val3Desc: "Diseñar interfaces responsivas, atractivas e intuitivas que se adapten a cualquier pantalla.",
                val4Title: "Adaptabilidad",
                val4Desc: "Aprendizaje continuo para dominar nuevas tecnologías y resolver problemas de forma óptima.",
                j1Title: "La Chispa",
                j1Desc: "Comencé a crear maquetaciones responsivas descubriendo una fuerte pasión por el desarrollo web.",
                j2Title: "Escala Full-Stack",
                j2Desc: "Enfoque en React.js y el backend (Node, Express, MongoDB) para el desarrollo de aplicaciones completas.",
                j3Title: "Soluciones Avanzadas",
                j3Desc: "Desarrollo de portafolios, arquitecturas de bases de datos y animaciones premium a medida."
            },
            skills: {
                title: "Habilidades",
                frontend: "Frontend",
                backend: "Backend",
                devTools: "Herramientas",
                design: "Diseño"
            },
            services: {
                title: "Servicios y Especialidades",
                s1Title: "Desarrollo Back-End",
                s1Desc: "Soluciones con Node.js, Express, MongoDB y Firebase para la creación de APIs, servidores, bases de datos y aplicaciones robustas.",
                s2Title: "UI/UX Responsivo",
                s2Desc: "Experiencias optimizadas para dispositivos móviles diseñadas para verse increíbles en computadoras, tabletas y celulares.",
                s3Title: "SEO y Rendimiento",
                s3Desc: "Estructuración semántica, optimización de velocidad de carga y configuración SEO para mejorar tu posicionamiento en Google."
            },
            projects: {
                title: "Proyectos",
                purpose: "¿Por qué se hizo? (El Propósito)",
                challenges: "Desafíos y Desarrollo",
                technologies: "Tecnologías Utilizadas",
                liveDemo: "Detalles del Proyecto",
                livePage: "Ver Página en Vivo",
                downloadApk: "Descargar APK",
                filterAll: "Todos",
                filterReact: "React.js",
                filterVanilla: "HTML / CSS / JS",
                back: "Volver al Portafolio",
                dateLabel: "Fecha",
                categoryLabel: "Categoría",
                siteLabel: "Sitio Web"
            },
            faq: {
                title: "Preguntas Frecuentes",
                q1: "¿Qué servicios ofreces?",
                a1: "Desarrollo aplicaciones web full-stack modernas, landing pages responsivas y soluciones digitales completas con React.js, Node.js, Express, MongoDB y Firebase.",
                q2: "¿Trabajas tanto en frontend como en backend?",
                a2: "Sí. Como desarrollador full-stack, me encargo de todo, desde las interfaces de usuario hasta las APIs, servidores, bases de datos y la arquitectura completa de la aplicación.",
                q3: "¿Puedes mejorar un sitio web existente?",
                a3: "Por supuesto. Puedo ayudar a rediseñar, optimizar y mejorar la estructura, velocidad, SEO y funcionalidad de sitios web o aplicaciones existentes."
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
                successMessage: "¡Mensaje enviado con éxito! Te responderé pronto.",
                errorMessage: "Por favor completa todos los campos antes de enviar.",
                submitError: "Error al enviar el mensaje. Intenta de nuevo o contáctame directamente por correo.",
                stepName: "Nombre",
                stepEmail: "Correo",
                stepMsg: "Mensaje",
                step1Title: "¡Comencemos! ¿Cómo te llamas?",
                step2Title: "¡Genial! ¿A qué correo te respondemos?",
                step3Title: "¡Ya casi! Cuéntanos tu mensaje o idea.",
                next: "Siguiente",
                back: "Atrás"
            },
            preloader: {
                welcome: "¡Bienvenido!"
            }
        }
    };

    /* ===================
       0. LANGUAGE TOGGLE
       =================== */
    let currentLang = localStorage.getItem("portfolio-lang") || "es";

    function applyLanguage(lang) {
        // Handle text content translations
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(element => {
            const key = element.getAttribute("data-i18n");
            const keys = key.split(".");
            let translation = translations[lang];
            keys.forEach(k => {
                if (translation) {
                    translation = translation[k];
                }
            });
            if (translation && typeof translation === "string") {
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
                if (translation) {
                    translation = translation[k];
                }
            });
            if (translation && typeof translation === "string") {
                element.placeholder = translation;
            }
        });

        langToggle.textContent = lang === "en" ? "ES" : "EN";
        document.documentElement.setAttribute("lang", lang);
        currentLang = lang;

        // If the details modal is currently open, refresh its static text titles
        const modal = document.getElementById("project-modal");
        if (modal && modal.classList.contains("open")) {
            const activeProjId = modal.getAttribute("data-active-project");
            if (activeProjId) {
                populateModal(activeProjId);
            }
        }
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
        const heroProfileImg = document.querySelector(".profile-img");
        if (theme === "light") {
            document.documentElement.setAttribute("data-theme", "light");
            themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            if (heroProfileImg) {
                heroProfileImg.src = "images/profile-img.jpeg";
            }
        } else {
            document.documentElement.removeAttribute("data-theme");
            themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            if (heroProfileImg) {
                heroProfileImg.src = "images/profile-img-dark.png";
            }
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
        if (!nav.classList.contains("visible")) return;
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
        if (scrollTopBtn) {
            if (scrollY > 500) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        }

        lastScroll = scrollY;
    });

    /* ===================
       4. SCROLL TO TOP
       =================== */
    if (scrollTopBtn) {
        if (scrollTopBtn) scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

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
        "Full-Stack Developer",
        "React.js Developer",
        "Node.js Developer",
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
       6b. HERO STATS COUNTER ANIMATION
       =================== */
    const statsNumbers = document.querySelectorAll(".stat-number");

    const animateCounter = (el) => {
        const target = +el.getAttribute("data-target");
        const duration = 1500; // 1.5s animation duration
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad formula
            const easeProgress = progress * (2 - progress);
            const value = Math.floor(easeProgress * target);

            el.textContent = `${value}+`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = `${target}+`;
            }
        };

        requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCounter(el);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach((num) => statsObserver.observe(num));

    /* ===================
       6c. HERO MOUSE PARALLAX EFFECT (Interactive SVG Head-Turn & Eye-Tracking)
       =================== */
    const heroSection = document.getElementById("hero");
    const profileRing = document.querySelector(".profile-ring");
    const avatarPupils = document.getElementById("avatar-pupils");
    const avatarHead = document.getElementById("avatar-head-group");
    const avatarGlasses = document.getElementById("avatar-glasses");
    const avatarHair = document.getElementById("avatar-hair");

    if (heroSection && window.innerWidth > 768) {
        // Variables for smooth interpolation (Lerp)
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        let isHovering = false;

        // Target offsets per layer
        const pupilMax = 6;
        const glassesMax = 4;
        const headMax = 3.5;
        const hairMax = 2.5;

        // Linear interpolation factor
        const lerpFactor = 0.08;

        const updateAvatarTracking = () => {
            // Apply LERP transition to actual values
            mouseX += (targetX - mouseX) * lerpFactor;
            mouseY += (targetY - mouseY) * lerpFactor;

            // Apply displacement to SVG elements
            if (avatarPupils) {
                avatarPupils.style.transform = `translate(${mouseX * pupilMax}px, ${mouseY * pupilMax}px)`;
            }
            if (avatarGlasses) {
                avatarGlasses.style.transform = `translate(${mouseX * glassesMax}px, ${mouseY * glassesMax}px)`;
            }
            if (avatarHead) {
                avatarHead.style.transform = `translate(${mouseX * headMax}px, ${mouseY * headMax}px)`;
            }
            if (avatarHair) {
                avatarHair.style.transform = `translate(${mouseX * hairMax}px, ${mouseY * hairMax}px)`;
            }

            // Keep animating as long as values have not fully settled or user is hovering
            if (isHovering || Math.abs(targetX - mouseX) > 0.001 || Math.abs(targetY - mouseY) > 0.001) {
                requestAnimationFrame(updateAvatarTracking);
            } else {
                // Hard snap to center to release CPU cycles when completely still
                mouseX = targetX;
                mouseY = targetY;
            }
        };

        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();

            // Normalize cursor position inside container from -1.0 to 1.0
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            targetX = (relX / rect.width) * 2 - 1;
            targetY = (relY / rect.height) * 2 - 1;

            if (!isHovering) {
                isHovering = true;
                requestAnimationFrame(updateAvatarTracking);
            }
        });

        heroSection.addEventListener("mouseleave", () => {
            isHovering = false;
            targetX = 0;
            targetY = 0;
        });

        // Add subtle constant pulse movement to the profile ring itself
        if (profileRing) {
            heroSection.addEventListener("mousemove", (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 12 - 6;
                const y = ((e.clientY - rect.top) / rect.height) * 12 - 6;
                profileRing.style.transform = `translate(${x}px, ${y}px)`;
            });
            heroSection.addEventListener("mouseleave", () => {
                profileRing.style.transform = "translate(0, 0)";
            });
        }
    }

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
       8. PROJECT FILTERING LOGIC
       =================== */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".timeline-item, .featured-project-container");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active state class
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hide");
                    // Trigger reflow for transition
                    void card.offsetWidth;
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.85)";
                    // Timeout matches standard transition
                    setTimeout(() => {
                        if (btn.classList.contains("active") && btn.getAttribute("data-filter") !== filterValue && category !== btn.getAttribute("data-filter")) {
                            card.classList.add("hide");
                        }
                    }, 300);
                }
            });
        });
    });

    /* ===================
       9. FAQ ACCORDION LOGIC
       =================== */
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector(".faq-answer");
            const isOpen = question.getAttribute("aria-expanded") === "true";

            // Close other open accordion elements
            document.querySelectorAll(".faq-item").forEach(item => {
                if (item !== faqItem) {
                    const q = item.querySelector(".faq-question");
                    const a = item.querySelector(".faq-answer");
                    q.setAttribute("aria-expanded", "false");
                    a.setAttribute("aria-hidden", "true");
                    a.style.maxHeight = null;
                }
            });

            // Toggle current element
            if (isOpen) {
                question.setAttribute("aria-expanded", "false");
                answer.setAttribute("aria-hidden", "true");
                answer.style.maxHeight = null;
            } else {
                question.setAttribute("aria-expanded", "true");
                answer.setAttribute("aria-hidden", "false");
                // Set max-height dynamically to content scroll height for fluid slide transitions
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* ===================
       10. PROJECT DETAILS MODAL LOGIC
       =================== */
    const projectsData = {
        vox: {
            title: "VOX Business Developer",
            period: { en: "Aug 2026", es: "Ago 2026" },
            badge: "HTML / CSS / JS",
            bgClass: "gradient-vox",
            icon: "bi-briefcase",
            purpose: {
                en: "VOX Business Developer required a web presence that reflected its status as a high-level multidisciplinary agency. The main objective was to build a sophisticated and highly attractive digital platform that visually unified its services in marketing, corporate law, branding, 3D renders, and consulting, making it easy for potential clients to schedule meetings.",
                es: "VOX Business Developer requería una presencia en la web que reflejara su estatus como una agencia multidisciplinaria de alto nivel. El objetivo principal era construir una plataforma digital sofisticada y sumamente atractiva que unificara visualmente sus servicios en marketing, legal corporativo, branding, renders 3D y consultoría."
            },
            challenges: {
                en: "Optimizing heavy resources (like hero videos and high-res architectural renders) while maintaining excellent loading speeds on mobile devices. A custom preloader system was built, and smooth scroll (Lenis) was integrated alongside Intersection Observer animations. An interactive 3-step form with real-time validation was implemented via FormSubmit.",
                es: "El principal reto técnico fue optimizar los recursos pesados (como videos en el hero y renders arquitectónicos en alta resolución) manteniendo una excelente velocidad de carga y fluidez en móviles. Se estructuró un sistema de preloader dinámico y se aplicó desplazamiento suave avanzado junto con Intersection Observer. Asimismo, se implementó un formulario interactivo de 3 pasos con validaciones en tiempo real."
            },
            tags: ["HTML5", "CSS3", "JavaScript", "Lenis Scroll", "Lucide Icons", "FormSubmit"],
            actions: [
                { textKey: "projects.livePage", url: "https://www.voxbusinessdeveloper.com", icon: "bi-globe" },
                { textKey: "projects.liveDemo", url: "pages/vox.html", icon: "bi-info-circle" }
            ]
        },
        casa: {
            title: "Casa de Diseño",
            period: { en: "Aug 2026", es: "Ago 2026" },
            badge: "HTML / CSS / JS",
            bgClass: "gradient-casa",
            icon: "bi-house-heart",
            purpose: {
                en: "Create a modern, high-converting digital storefront for a boutique interior design studio based in Puebla, Mexico, reflecting its luxury approach and 12-year history.",
                es: "Crear un escaparate digital moderno y de alta conversión para un estudio boutique de diseño de interiores en Puebla, México, que refleje su enfoque de lujo y trayectoria de 12 años."
            },
            challenges: {
                en: "Integrating smooth performance for heavy multimedia content such as background videos and high-definition project galleries, while optimizing SEO structured data and mobile responsivity.",
                es: "Integrar un rendimiento fluido para contenido multimedia pesado como videos de fondo y galerías en alta definición, optimizando a su vez datos estructurados de SEO y responsividad móvil."
            },
            tags: ["HTML5", "CSS3", "JavaScript", "JSON-LD SEO", "HTML5 Video", "Responsive Layout"],
            actions: [
                { textKey: "projects.livePage", url: "https://casadedisenodeinteriores.com.mx", icon: "bi-globe" },
                { textKey: "projects.liveDemo", url: "pages/casa-diseno.html", icon: "bi-info-circle" }
            ]
        },
        eunoia: {
            title: "Eunoia-App",
            period: { en: "Apr 2026 – May 2026", es: "Abr 2026 – May 2026" },
            badge: "React.js",
            bgClass: "gradient-purple",
            icon: "bi-chat-quote",
            purpose: {
                en: "A beautiful philosophical quotes web application designed to inspire users daily. The app displays randomly selected inspiring thoughts, sorted by philosophers and categories, with options to bookmark favorites.",
                es: "Una hermosa aplicación web de frases filosóficas diseñada para inspirar a los usuarios diariamente. La aplicación muestra pensamientos inspiradores seleccionados al azar, organizados por filósofos y categorías, con opciones para guardar favoritos."
            },
            challenges: {
                en: "Structuring global state management for favorites using local storage, designing a neat minimal UI, and porting the application to a native mobile format (APK file) using Capacitor, ensuring all screen transitions and native inputs feel smooth.",
                es: "Estructurar la gestión de estado global para favoritos usando el almacenamiento local, diseñar una interfaz mínima limpia y portar la aplicación a un formato móvil nativo (archivo APK) usando Capacitor, garantizando que todas las transiciones se sientan fluidas."
            },
            tags: ["React.js", "JavaScript", "Capacitor", "CSS3", "Local Storage", "Responsive"],
            actions: [
                { textKey: "projects.downloadApk", url: "Apks/Eunoia-App.apk", icon: "bi-download" },
                { textKey: "projects.liveDemo", url: "pages/eunoia.html", icon: "bi-info-circle" }
            ]
        },
        shineup: {
            title: "Shine Up",
            period: { en: "Apr 2026", es: "Abr 2026" },
            badge: "HTML / CSS / JS",
            bgClass: "gradient-pink",
            icon: "bi-sun",
            purpose: {
                en: "An interactive motivational web application that presents daily positive affirmations and mental exercises, helping users build self-esteem and track their mood over time.",
                es: "Una aplicación web motivacional interactiva que presenta afirmaciones positivas diarias y ejercicios mentales, ayudando a los usuarios a construir su autoestima y realizar un seguimiento de su estado de ánimo."
            },
            challenges: {
                en: "Designing dynamic interactions using vanilla JS DOM manipulation, ensuring offline accessibility, and bundling the app using Cordova to generate a lightweight Android APK package for distribution.",
                es: "Diseñar interacciones dinámicas utilizando manipulación del DOM con JavaScript puro, garantizar la accesibilidad fuera de línea y empaquetar la aplicación con Cordova para generar un archivo APK de Android ligero para distribución."
            },
            tags: ["HTML5", "CSS3", "JavaScript", "Cordova", "Local Storage", "CSS Animations"],
            actions: [
                { textKey: "projects.downloadApk", url: "Apks/Shine-Up.apk", icon: "bi-download" },
                { textKey: "projects.liveDemo", url: "pages/shineup.html", icon: "bi-info-circle" }
            ]
        },
        elements: {
            title: "Elements Finder",
            period: { en: "Jan 2026", es: "Ene 2026" },
            badge: "React.js",
            bgClass: "gradient-blue",
            icon: "bi-search",
            purpose: {
                en: "An educational chemistry web application that allows students and users to search, filter, and inspect detailed properties of elements in the periodic table in real time.",
                es: "Una aplicación web de química educativa que permite a estudiantes y usuarios buscar, filtrar e inspeccionar las propiedades detalladas de los elementos en la tabla periódica en tiempo real."
            },
            challenges: {
                en: "Managing search filtering performance on a large dataset of element properties, designing an intuitive periodic table interface that adjusts fluidly on mobile screens, and optimizing asset delivery for element diagrams.",
                es: "Gestionar el rendimiento del filtrado de búsqueda en un conjunto de datos grande de propiedades de elementos, diseñar una interfaz de tabla periódica intuitiva que se adapte de forma fluida a pantallas móviles."
            },
            tags: ["React.js", "JavaScript", "CSS3", "Chemistry API", "Filter Algorithm", "Responsive Design"],
            actions: [
                { textKey: "projects.liveDemo", url: "pages/elements-finder.html", icon: "bi-info-circle" }
            ]
        },
        notes: {
            title: "Notes Blog",
            period: { en: "Dec 2025", es: "Dic 2025" },
            badge: "HTML / CSS / JS",
            bgClass: "gradient-green",
            icon: "bi-journal-text",
            purpose: {
                en: "A personal note-taking dashboard to quickly write down ideas, structure blogs, and organize daily activities. Notes are saved automatically to prevent data loss.",
                es: "Un tablero de notas personal para escribir rápidamente ideas, estructurar blogs y organizar actividades diarias. Las notas se guardan de forma automática para evitar la pérdida de datos."
            },
            challenges: {
                en: "Working extensively with Vanilla JavaScript to manage complex DOM operations, persisting notes across browser sessions without a database using localStorage, and styling a sleek dashboard with dynamic colors.",
                es: "Trabajar extensamente con JavaScript puro para gestionar operaciones complejas del DOM, persistir notas a través de sesiones de navegador sin una base de datos mediante localStorage y diseñar un tablero minimalista."
            },
            tags: ["HTML5", "CSS3", "JavaScript", "Local Storage", "DOM Manipulation", "CSS Grid"],
            actions: [
                { textKey: "projects.liveDemo", url: "pages/notes-blog.html", icon: "bi-info-circle" }
            ]
        },
        landing: {
            title: "Landing Page",
            period: { en: "Aug 2025", es: "Ago 2025" },
            badge: "React.js",
            bgClass: "gradient-orange",
            icon: "bi-window-desktop",
            purpose: {
                en: "A highly optimized, semantic product landing page designed to demonstrate modern web aesthetics, fast load speeds, and strict layout responsiveness.",
                es: "Una página de aterrizaje de productos altamente optimizada y semántica, diseñada para demostrar estética web moderna, alta velocidad de carga y responsividad rigurosa."
            },
            challenges: {
                en: "Strictly adhering to semantic HTML5 standards, structuring stylesheet variables to support instantaneous light/dark theme shifts, and optimizing image layouts using modern web compression standards.",
                es: "Adherirse estrictamente a los estándares semánticos de HTML5, estructurar variables CSS para soportar cambios instantáneos entre temas claro/oscuro y optimizar el rendimiento."
            },
            tags: ["React.js", "HTML5 Semantics", "CSS Custom Variables", "Responsive Design", "SEO Best Practices"],
            actions: [
                { textKey: "projects.liveDemo", url: "pages/landing-page.html", icon: "bi-info-circle" }
            ]
        }
    };

    const modal = document.getElementById("project-modal");
    const modalClose = document.getElementById("modal-close");
    const detailsButtons = document.querySelectorAll(".details-btn");

    function populateModal(projectId) {
        const data = projectsData[projectId];
        if (!data || !modal) return;

        // Set static state attributes
        modal.setAttribute("data-active-project", projectId);

        // Header Background & Badge & Icon
        const previewBg = document.getElementById("modal-preview-bg");
        if (previewBg) previewBg.className = "modal-header-preview " + data.bgClass;

        const badge = document.getElementById("modal-badge");
        if (badge) badge.textContent = data.badge;

        // Textual info
        const titleEl = document.getElementById("modal-title");
        if (titleEl) titleEl.textContent = data.title;

        const periodEl = document.getElementById("modal-period");
        if (periodEl) periodEl.innerHTML = `<i class="bi bi-calendar3"></i> ${currentLang === "en" ? data.period.en : data.period.es}`;

        const purposeEl = document.getElementById("modal-purpose");
        if (purposeEl) purposeEl.textContent = currentLang === "en" ? data.purpose.en : data.purpose.es;

        const challengesEl = document.getElementById("modal-challenges");
        if (challengesEl) challengesEl.textContent = currentLang === "en" ? data.challenges.en : data.challenges.es;

        // Tags List
        const tagsContainer = document.getElementById("modal-tags");
        if (tagsContainer) {
            tagsContainer.innerHTML = "";
            data.tags.forEach(tag => {
                const span = document.createElement("span");
                span.className = "modal-tag";
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });
        }

        // Action Buttons
        const actionsContainer = document.getElementById("modal-actions");
        if (actionsContainer) {
            actionsContainer.innerHTML = "";
            data.actions.forEach(act => {
                const link = document.createElement("a");
                link.href = act.url;
                if (act.url.startsWith("http")) {
                    link.target = "_blank";
                    link.rel = "noopener";
                }
                link.className = "btn " + (act.textKey.includes("livePage") || act.textKey.includes("downloadApk") ? "btn-primary" : "btn-outline");

                // Translate the button label text
                const labelKey = act.textKey.split(".");
                let labelText = translations[currentLang];
                labelKey.forEach(k => { if (labelText) labelText = labelText[k]; });

                link.innerHTML = `<i class="bi ${act.icon}"></i> ${labelText || act.textKey}`;
                actionsContainer.appendChild(link);
            });
        }
    }

    function openModal(projectId) {
        populateModal(projectId);
        if (modal) {
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            modal.focus();
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove("open");
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("data-active-project");
            document.body.style.removeProperty("overflow");
        }
    }

    detailsButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectId = btn.getAttribute("data-project");
            openModal(projectId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    const modalOverlay = modal ? modal.querySelector(".modal-overlay") : null;
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeModal);
    }

    // Modal accessibility Esc key close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && modal.classList.contains("open")) {
            closeModal();
        }
    });

    /* ===================
       11. CONTACT FORM HANDLER & MULTI-STEP NAVIGATION
       =================== */
    if (contactForm) {
        const stepPanes = document.querySelectorAll(".form-step-pane");
        const stepNodes = document.querySelectorAll(".step-node");
        const stepLineFill = document.getElementById("step-line-fill");
        const nextButtons = document.querySelectorAll(".btn-next");
        const prevButtons = document.querySelectorAll(".btn-prev");

        // Helper function to update step visual indicator states
        function goToStep(stepNum) {
            // Update panes
            stepPanes.forEach(pane => pane.classList.remove("active"));
            const targetPane = document.getElementById(`step-pane-${stepNum}`);
            if (targetPane) targetPane.classList.add("active");

            // Update Nodes
            stepNodes.forEach(node => {
                const nodeStep = parseInt(node.getAttribute("data-step"));
                if (nodeStep < stepNum) {
                    node.classList.add("completed");
                    node.classList.remove("active");
                } else if (nodeStep === stepNum) {
                    node.classList.add("active");
                    node.classList.remove("completed");
                } else {
                    node.classList.remove("active", "completed");
                }
            });

            // Update connector line width
            if (stepLineFill) {
                const fillPct = ((stepNum - 1) / (stepNodes.length - 1)) * 100;
                stepLineFill.style.width = `${fillPct}%`;
            }
        }

        // Validate current step fields
        function validateStep(stepNum) {
            if (stepNum === 1) {
                const nameInput = document.getElementById("form-name");
                if (!nameInput.value.trim()) {
                    nameInput.reportValidity();
                    return false;
                }
            } else if (stepNum === 2) {
                const emailInput = document.getElementById("form-email");
                if (!emailInput.value.trim() || !emailInput.checkValidity()) {
                    emailInput.reportValidity();
                    return false;
                }
            }
            return true;
        }

        // Next Buttons click listener
        nextButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const currentStepPane = btn.closest(".form-step-pane");
                if (currentStepPane) {
                    const currentStepNum = parseInt(currentStepPane.id.replace("step-pane-", ""));
                    const nextStepNum = parseInt(btn.getAttribute("data-next-step"));

                    if (validateStep(currentStepNum)) {
                        goToStep(nextStepNum);
                    }
                }
            });
        });

        // Prev Buttons click listener
        prevButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const prevStepNum = parseInt(btn.getAttribute("data-prev-step"));
                goToStep(prevStepNum);
            });
        });

        // Handle Submission
        if (contactForm) contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("form-name");
            const emailInput = document.getElementById("form-email");
            const messageInput = document.getElementById("form-message");
            const submitBtn = document.getElementById("form-submit");

            // Final step checks for validity
            if (!nameInput.value.trim()) {
                goToStep(1);
                nameInput.reportValidity();
                return;
            }
            if (!emailInput.value.trim() || !emailInput.checkValidity()) {
                goToStep(2);
                emailInput.reportValidity();
                return;
            }
            if (!messageInput.value.trim()) {
                messageInput.reportValidity();
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
            if (formStatusElement) {
                formStatusElement.textContent = "";
                formStatusElement.classList.remove("error", "success");
            }

            try {
                // Check if EmailJS is properly configured
                if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === "YOUR_EMAILJS_PUBLIC_KEY") {
                    throw new Error("EmailJS not configured. Please add your EmailJS credentials.");
                }

                // Send email to client (confirmation)
                const clientParams = {
                    name: name,
                    email: email,
                    title: "Portfolio Contact",
                    message: message
                };

                const clientResponse = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID_CLIENT,
                    clientParams
                );

                // Send email to you (message notification)
                const ownerParams = {
                    name: name,
                    email: email,
                    message: message
                };

                const ownerResponse = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID_OWNER,
                    ownerParams
                );

                if (clientResponse.status === 200 && ownerResponse.status === 200) {
                    submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Sent!';
                    contactForm.classList.add("success");
                    if (formStatusElement) {
                        const successMsg = currentLang === "en"
                            ? "Thank you for visiting my portfolio."
                            : "Gracias por visitar mi portafolio.";
                        formStatusElement.textContent = successMsg;
                        formStatusElement.classList.add("success");
                    }

                    // Reset and go back to step 1
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="bi bi-send"></i> ' + translations[currentLang].contact.sendMessage;
                        contactForm.classList.remove("success");
                        if (formStatusElement) {
                            formStatusElement.textContent = "";
                            formStatusElement.classList.remove("success");
                        }
                        goToStep(1);
                    }, 3000);
                } else {
                    throw new Error("Failed to send email");
                }
            } catch (error) {
                console.error("EmailJS Error:", error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-send"></i> ' + translations[currentLang].contact.sendMessage;
                if (formStatusElement) {
                    const errorMsg = currentLang === "en"
                        ? "Failed to send message. Please try again or contact me directly via email."
                        : "Error al enviar el mensaje. Intenta de nuevo o contáctame directamente por correo.";
                    formStatusElement.textContent = errorMsg;
                    formStatusElement.classList.add("error");
                }
            }
        });
    }

    /* ===================
       12. SMOOTH SCROLL for nav links
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

    /* ===================
       13. STICKY SHOWCASE SYNCHRONIZATION
       =================== */
    const timelineItems = document.querySelectorAll(".timeline-item, .featured-project-container");
    const showcaseSlides = document.querySelectorAll(".showcase-slide");

    function activateSlide(projectId) {
        showcaseSlides.forEach(slide => {
            if (slide.getAttribute("data-slide") === projectId) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });
    }

    timelineItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const detailsBtn = item.querySelector(".details-btn");
            if (detailsBtn) {
                const projectId = detailsBtn.getAttribute("data-project");
                activateSlide(projectId);
            }
        });
    });

    const syncObserverOptions = {
        threshold: 0.3,
        rootMargin: "-25% 0px -35% 0px"
    };

    const syncObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const detailsBtn = entry.target.querySelector(".details-btn");
                if (detailsBtn) {
                    const projectId = detailsBtn.getAttribute("data-project");
                    activateSlide(projectId);
                }
            }
        });
    }, syncObserverOptions);

    timelineItems.forEach(item => syncObserver.observe(item));

    /* ===================
       14. SKILLS TABS HANDLER
       =================== */
    const skillsTabButtons = document.querySelectorAll(".skills-tab-btn");
    const skillsGroups = document.querySelectorAll(".skills-group");

    skillsTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");

            // Toggle buttons active state
            skillsTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Toggle groups active state
            skillsGroups.forEach(group => {
                if (group.id === `tab-${tabId}`) {
                    group.classList.add("active");
                } else {
                    group.classList.remove("active");
                }
            });
        });
    });

    /* ===================
       15. ABOUT ME TABS HANDLER
       =================== */
    const aboutTabButtons = document.querySelectorAll(".about-tab-btn");
    const aboutGroups = document.querySelectorAll(".about-group");

    aboutTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-about-tab");

            // Toggle buttons active state
            aboutTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Toggle groups active state
            aboutGroups.forEach(group => {
                if (group.id === `about-tab-${tabId}`) {
                    group.classList.add("active");
                } else {
                    group.classList.remove("active");
                }
            });
        });
    });
});
