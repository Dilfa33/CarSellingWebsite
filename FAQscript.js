const toggleButton = document.getElementById('faq-toggle');
const faqSection = document.getElementById('faq-section');

toggleButton.addEventListener('click', () => {
    if (faqSection.style.display === 'none') {
        faqSection.style.display = 'block';
        toggleButton.textContent = 'Hide FAQ';
    } else {
        faqSection.style.display = 'none';
        toggleButton.textContent = 'Show FAQ';
    }
});