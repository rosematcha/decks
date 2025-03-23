document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    
    // Get all card elements
    const cards = document.querySelectorAll('.card');
    
    // Open modal with card image
    function openModal(imageUrl, cardName) {
        modalImg.src = imageUrl;
        modalImg.alt = cardName;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Add click listeners to cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            const cardName = this.getAttribute('data-name');
            openModal(imageUrl, cardName);
        });
    });
    
    // Close button click
    closeBtn.addEventListener('click', closeModal);
    
    // Click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
