const fs = require('fs');

// 1. Add CSS to style.css
let css = fs.readFileSync('style.css', 'utf8');
const detailsBtnCss = `
.project-btn.details-btn {
    background: var(--accent-glow);
    color: var(--accent);
    border: 1px solid var(--accent);
    box-shadow: 0 0 15px var(--accent-glow);
    font-weight: 600;
    transition: var(--transition);
}
.project-btn.details-btn:hover {
    background: var(--gradient);
    color: #ffffff;
    border-color: transparent;
    box-shadow: 0 0 25px var(--accent-glow-secondary);
    transform: translateY(-3px);
}
`;
fs.writeFileSync('style.css', css + detailsBtnCss);

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/class="project-btn"/g, 'class="project-btn details-btn"');
fs.writeFileSync('index.html', html);

console.log("Details button upgraded");

