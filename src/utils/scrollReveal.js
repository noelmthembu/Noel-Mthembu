// Add this script to your main.jsx file or create a new file
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all sections and elements with reveal classes
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    
    sections.forEach(section => observer.observe(section));
    revealElements.forEach(el => observer.observe(el));
});