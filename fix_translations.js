const fs = require('fs');

// 1. Fix main.js null errors and add translations
let mainJs = fs.readFileSync('main.js', 'utf8');
mainJs = mainJs.replace(/scrollTopBtn\.addEventListener/g, 'if(scrollTopBtn) scrollTopBtn.addEventListener');
mainJs = mainJs.replace(/function typeEffect\(\) \{/g, 'function typeEffect() {\n        if (!typedRole) return;');
mainJs = mainJs.replace(/contactForm\.addEventListener/g, 'if(contactForm) contactForm.addEventListener');

// Add translations for project pages
const enProjects = `projects: {\n                title: "Projects",\n                purpose: "Why was it made? (Purpose)",\n                challenges: "Challenges & Development",\n                technologies: "Technologies Used",\n                liveDemo: "Live Demo",\n                downloadApk: "Download APK"\n            }`;
const esProjects = `projects: {\n                title: "Proyectos",\n                purpose: "¿Por qué se hizo? (El Propósito)",\n                challenges: "Desafíos y Desarrollo",\n                technologies: "Tecnologías Utilizadas",\n                liveDemo: "Ver Demo en Vivo",\n                downloadApk: "Descargar APK"\n            }`;
mainJs = mainJs.replace(/projects:\s*\{\s*title:\s*"Projects"\s*\}/g, enProjects);
mainJs = mainJs.replace(/projects:\s*\{\s*title:\s*"Proyectos"\s*\}/g, esProjects);

fs.writeFileSync('main.js', mainJs);

// 2. Fix HTML files
const files = [
    'pages/shineup.html',
    'pages/eunoia.html',
    'pages/elements-finder.html',
    'pages/notes-blog.html',
    'pages/landing-page.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Fix nav links
    content = content.replace(/<a href="\.\.\/index\.html#hero" class="nav-link">Home<\/a>/g, '<a href="../index.html#hero" class="nav-link" data-i18n="nav.home">Home</a>');
    content = content.replace(/<a href="\.\.\/index\.html#about" class="nav-link">About<\/a>/g, '<a href="../index.html#about" class="nav-link" data-i18n="nav.about">About</a>');
    content = content.replace(/<a href="\.\.\/index\.html#skills" class="nav-link">Skills<\/a>/g, '<a href="../index.html#skills" class="nav-link" data-i18n="nav.skills">Skills</a>');
    content = content.replace(/<a href="\.\.\/index\.html#projects" class="nav-link active">Projects<\/a>/g, '<a href="../index.html#projects" class="nav-link active" data-i18n="nav.projects">Projects</a>');
    content = content.replace(/<a href="\.\.\/index\.html#contact" class="nav-link">Contact<\/a>/g, '<a href="../index.html#contact" class="nav-link" data-i18n="nav.contact">Contact</a>');

    // Fix project headings
    content = content.replace(/<h2>¿Por qué se hizo\? \(El Propósito\)<\/h2>/g, '<h2 data-i18n="projects.purpose">¿Por qué se hizo? (El Propósito)</h2>');
    content = content.replace(/<h2>Desafíos y Desarrollo<\/h2>/g, '<h2 data-i18n="projects.challenges">Desafíos y Desarrollo</h2>');
    content = content.replace(/<h2>Tecnologías Utilizadas<\/h2>/g, '<h2 data-i18n="projects.technologies">Tecnologías Utilizadas</h2>');
    content = content.replace(/<i class="bi bi-globe"><\/i> Ver Demo en Vivo/g, '<i class="bi bi-globe"></i> <span data-i18n="projects.liveDemo">Ver Demo en Vivo</span>');
    content = content.replace(/<i class="bi bi-download"><\/i> Descargar APK/g, '<i class="bi bi-download"></i> <span data-i18n="projects.downloadApk">Descargar APK</span>');

    fs.writeFileSync(file, content);
});
console.log("Translations fixed");
