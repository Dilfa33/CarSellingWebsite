const faqToggle = document.getElementById('faq-toggle');
const faqSection = document.getElementById('faq-section');

faqToggle.addEventListener('click', () => {
    if (faqSection.style.display === 'none') {
        faqSection.style.display = 'block';
        faqToggle.textContent = 'Hide FAQ';
    } else {
        faqSection.style.display = 'none';
        faqToggle.textContent = 'Show FAQ';
    }
});

// Accordion functionality for FAQ items
const faqHeaders = document.querySelectorAll('.faq-header');
faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});