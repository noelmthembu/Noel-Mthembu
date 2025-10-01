document.addEventListener('DOMContentLoaded', () => {
    // Add hide class to all elements initially
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    revealElements.forEach(el => {
        el.classList.add('hide');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove hide class when element comes into view
                entry.target.classList.remove('hide');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all elements with reveal classes
    revealElements.forEach(el => {
        observer.observe(el);
    });
});