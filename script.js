// ... previous code ...

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    // Touch events for mobile
    familyTree.addEventListener('touchstart', touchStart);
    familyTree.addEventListener('touchmove', touchMove);
    familyTree.addEventListener('touchend', dragEnd);

    function touchStart(e) {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;

        if (e.target === familyTree) {
            isDragging = true;
        }
    }

    function touchMove(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, familyTree);
        }
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    // Add member photo click handling in modal
    modalPhotos.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            modalImage.src = e.target.src;
        }
    });

    // Optional: Add a sample family member data loader
    function loadFamilyMemberData(id) {
        return fetch(`/api/family-member/${id}`)
            .then(response => response.json())
            .then(data => {
                familyData[id] = data;
                return data;
            })
            .catch(error => {
                console.error('Error loading family member data:', error);
                return null;
            });
    }
});