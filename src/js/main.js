// Rotating hero images (homepage only)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.hero-image img');
    if (images.length > 1) {
        let currentIndex = 0;

        function rotateImages() {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }

        // Rotate every 5 seconds
        setInterval(rotateImages, 5000);
    }
});

// Expandable tier cards (membership page only)
function toggleBenefits(btn) {
    const card = btn.closest('.tier-card');
    const benefits = card.querySelector('.tier-more-benefits');

    btn.classList.toggle('expanded');
    benefits.classList.toggle('visible');

    if (btn.classList.contains('expanded')) {
        btn.textContent = 'Show less';
    } else {
        // Check if it's the Quercus card
        if (card.classList.contains('quercus')) {
            btn.textContent = 'Read more';
        } else {
            btn.textContent = 'Show more';
        }
    }
}
