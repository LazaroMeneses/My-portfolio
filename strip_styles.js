const fs = require('fs');
const files = [
    'pages/shineup.html',
    'pages/eunoia.html',
    'pages/elements-finder.html',
    'pages/notes-blog.html',
    'pages/landing-page.html'
];
const classes = [
    'project-shineup',
    'project-eunoia',
    'project-elements',
    'project-notes',
    'project-landing'
];

files.forEach((file, index) => {
    let content = fs.readFileSync(file, 'utf8');
    // Remove style block
    content = content.replace(/<style>[\s\S]*?<\/style>/, '');
    // Add class to main
    content = content.replace('<main>', `<main class="${classes[index]}">`);
    fs.writeFileSync(file, content);
});
console.log("Done");

