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
       0. PRELOADER ANIMATION
       =================== */
    const preloader = document.getElementById("preloader");
    const letters = document.querySelectorAll(".loader-brand-text .letter");
    const spark = document.querySelector(".loader-spark");
    
    document.body.classList.add("preloader-active");

    if (preloader && letters.length > 0 && spark) {
        let currentLetterIdx = 0;
        
        // Short timeout to allow initial render
        setTimeout(() => {
            spark.style.opacity = "1";
            
            const revealInterval = setInterval(() => {
                if (currentLetterIdx < letters.length) {
                    const letter = letters[currentLetterIdx];
                    letter.classList.add("reveal");
                    
                    // Move spark to the right of the current letter
                    const offsetLeft = letter.offsetLeft + letter.offsetWidth;
                    spark.style.left = `${offsetLeft}px`;
                    
                    currentLetterIdx++;
                } else {
                    clearInterval(revealInterval);
                    
                    // Fade out spark
                    spark.style.opacity = "0";
                    spark.style.transform = "translate(-50%, -50%) scale(0)";
                    
                    // Dismiss preloader
                    setTimeout(() => {
                        preloader.classList.add("fade-out");
                        document.body.classList.remove("preloader-active");
                        setTimeout(() => {
                            preloader.style.display = "none";
                        }, 600);
                    }, 600);
                }
            }, 100); // writing speed (Disney spark trail tempo)
        }, 300);
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
                projects: "Projects",
                contact: "Contact"
            },
            hero: {
                greeting: "Hello, I'm",
                description: "I build robust and scalable full-stack web applications, connecting fast, intuitive frontends with secure APIs and databases.",
                viewProjects: "View Projects",
                getInTouch: "Get in Touch",
                projects: "Projects",
                yearExp: "Year Exp.",
                technologies: "Technologies"
            },
            about: {
                title: "About Me",
                para1: "Soy Lázaro Meneses, Full-Stack Developer apasionado por crear soluciones digitales modernas y funcionales. Mi experiencia abarca desde el desarrollo de interfaces y experiencias de usuario hasta la creación de APIs, servidores y bases de datos.",
                para2: "Trabajo principalmente con JavaScript, React, Node.js, Express, MongoDB y Firebase, combinando desarrollo, creatividad y aprendizaje constante para transformar ideas en productos digitales reales.",
                para3: "What motivates me most about programming is understanding the language of the future. I'm fascinated by how, through code, we can communicate with computers and bring ideas to life. What began as curiosity has become a long-term passion for building useful products."
            },
            skills: {
                title: "Skills",
                frontend: "Frontend",
                backend: "Backend",
                devTools: "Dev Tools",
                design: "Design"
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
                filterVanilla: "HTML / CSS / JS"
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
                description: "Desarrollo aplicaciones web full-stack robustas y escalables, conectando interfaces rápidas e intuitivas con APIs y bases de datos seguras.",
                viewProjects: "Ver Proyectos",
                getInTouch: "Contáctame",
                projects: "Proyectos",
                yearExp: "Año Exp.",
                technologies: "Tecnologías"
            },
            about: {
                title: "Sobre Mí",
                para1: "Soy Lázaro Meneses, Full-Stack Developer apasionado por crear soluciones digitales modernas y funcionales. Mi experiencia abarca desde el desarrollo de interfaces y experiencias de usuario hasta la creación de APIs, servidores y bases de datos.",
                para2: "Trabajo principalmente con JavaScript, React, Node.js, Express, MongoDB y Firebase, combinando desarrollo, creatividad y aprendizaje constante para transformar ideas en productos digitales reales.",
                para3: "Lo que más me motiva sobre la programación es entender el lenguaje del futuro. Me fascina cómo, a través del código, podemos comunicarnos con las computadoras y dar vida a nuestras ideas. Lo que comenzó como curiosidad se ha convertido en una pasión a largo plazo por construir productos útiles."
            },
            skills: {
                title: "Habilidades",
                frontend: "Frontend",
                backend: "Backend",
                devTools: "Herramientas",
                design: "Diseño"
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
                filterVanilla: "HTML / CSS / JS"
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
                successMessage: "Mensaje enviado con éxito. ¡Gracias!",
                errorMessage: "Por favor completa todos los campos antes de enviar.",
                submitError: "Algo salió mal. Intenta de nuevo más tarde."
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
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
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
        if (!data) return;

        // Set static state attributes
        modal.setAttribute("data-active-project", projectId);

        // Header Background & Badge & Icon
        const previewBg = document.getElementById("modal-preview-bg");
        previewBg.className = "modal-header-preview " + data.bgClass;
        
        const badge = document.getElementById("modal-badge");
        badge.textContent = data.badge;

        // Textual info
        document.getElementById("modal-title").textContent = data.title;
        document.getElementById("modal-period").innerHTML = `<i class="bi bi-calendar3"></i> ${currentLang === "en" ? data.period.en : data.period.es}`;
        document.getElementById("modal-purpose").textContent = currentLang === "en" ? data.purpose.en : data.purpose.es;
        document.getElementById("modal-challenges").textContent = currentLang === "en" ? data.challenges.en : data.challenges.es;

        // Tags List
        const tagsContainer = document.getElementById("modal-tags");
        tagsContainer.innerHTML = "";
        data.tags.forEach(tag => {
            const span = document.createElement("span");
            span.className = "modal-tag";
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        // Action Buttons
        const actionsContainer = document.getElementById("modal-actions");
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
            labelKey.forEach(k => { if(labelText) labelText = labelText[k]; });
            
            link.innerHTML = `<i class="bi ${act.icon}"></i> ${labelText || act.textKey}`;
            actionsContainer.appendChild(link);
        });
    }

    function openModal(projectId) {
        populateModal(projectId);
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        modal.focus();
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("data-active-project");
        document.body.style.removeProperty("overflow");
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

    const modalOverlay = modal.querySelector(".modal-overlay");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeModal);
    }

    // Modal accessibility Esc key close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

    /* ===================
       11. CONTACT FORM HANDLER
       =================== */
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
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
});
