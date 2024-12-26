document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.thumbnail');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close');
    const leftNav = document.querySelector('.nav.left');
    const rightNav = document.querySelector('.nav.right');

    let currentIndex = 0;

    // Open modal and show the clicked image
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index; // Save current image index
            modalImage.src = img.src; // Set modal image source
            modal.style.display = 'flex'; // Show modal
        });
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide modal
    });

    // Close the modal when clicked outside the image area
    modal.addEventListener('click', (event) => {
        if (event.target === modal) { // Only close when clicked outside the image
            modal.style.display = 'none';
        }
    });

    // Navigate left
    leftNav.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentIndex].src;
    });

    // Navigate right
    rightNav.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImage.src = images[currentIndex].src;
    });
});
